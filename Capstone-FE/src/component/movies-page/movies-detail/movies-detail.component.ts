import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  catchError,
  map,
  Observable,
  startWith
} from 'rxjs';
import {
  MovieDataType
} from 'src/data-type/movie';
import {
  MovieService
} from 'src/service/movie-service/movie.service';
import {
  COMMA,
  ENTER
} from '@angular/cdk/keycodes';
import {
  MatChipInputEvent
} from '@angular/material/chips';
import {
  Router
} from '@angular/router';
import {
  Store
} from '@ngrx/store';
import {
  toggleCreateBtn
} from '../movie-store/movie.action';
import {
  MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import actorInterface from 'src/data-type/actor.interface';
import { AuthService } from 'src/service/auth-service/auth.service';
@Component({
  selector: 'app-movies-detail',
  templateUrl: './movies-detail.component.html',
  styleUrls: ['./movies-detail.component.scss']
})
export class MoviesDetailComponent implements OnInit, OnDestroy {
  addOnBlur: boolean = true;
  mode: string = 'New'
  urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
  filmCategories: string[] = ['Action', 'Drama', 'Crime', 'Thriller', 'Adventure', 'Mystery']
  filmProductionStatus: string[] = ['Not Start', 'In Production', 'Finished', 'Postpone', 'Abandoned']
  haveData: boolean = false
  isEditExistingData: boolean = false
  newMovieCreateInfo!: MovieDataType
  movieDateObject: any = {}
  separatorKeysCodes: number[] = [ENTER, COMMA];
  actorCtrl = new FormControl('');
  filteredActors!: Observable < actorInterface[] > ;
  actorList: any[] = [];
  allActors: any[] = [];
  @ViewChild('fruitInput') fruitInput!: ElementRef < HTMLInputElement > ;
  constructor(public movieService: MovieService, public router: Router, public store: Store, public authService:AuthService) {

  }
  movieInfoForm = new FormGroup < any > ({})
  ngOnInit(): void {
    const modeSubscribe = this.movieService.getObservable().subscribe((object) => {
      if (object.logic === 'sendMode') {
        if (object.sentData === 'createNewMovie') {
          this.mode = 'New'
          this.movieService.getActorList().subscribe((res: any) => {
            this.initSuggestionList(res['actorList'])
          })
        } else if (object.sentData === 'EditMovie') {
          this.mode = 'Edit'
          this.newMovieCreateInfo = this.movieService.EditingMovie
          this.movieDateObject = this.movieService.convertStringToDateDataType([this.newMovieCreateInfo.releaseDate], ['releaseDate'])
          this.getCastedActor()
          this.haveData = true
        }
      } else if (object.logic === 'editDetail') {
        this.mode = 'Edit'
        this.newMovieCreateInfo = this.movieService.EditingMovie
        this.movieDateObject = this.movieService.convertStringToDateDataType([this.newMovieCreateInfo.releaseDate], ['releaseDate'])
        this.getCastedActor()
        this.haveData = true
      }
    })
    this.movieService.observableList.push(modeSubscribe)
    // this.movieService.observableSendData({logic:'toggleCreateBtn', sentData: false}, 'BtnToggleEmitter')
    this.initializeForm()
  }

  initializeForm() {
    this.movieInfoForm = new FormGroup({
      'movieTitle': new FormControl('', [Validators.required]),
      'movieReleaseDate': new FormControl('', [Validators.required])
    })
  }

  getMovieInfo() {
    this.newMovieCreateInfo = this.movieService.getNewMovieCreated()
    this.movieDateObject = this.movieService.convertStringToDateDataType([this.newMovieCreateInfo.releaseDate], ['releaseDate'])
    this.mode = 'Edit'
    this.haveData = true
  }

  onSubmit() {
    let id
    console.log(this.actorList)
    if (this.mode !== 'New') {
      id = this.movieService.EditingMovie.id
    }
    let movieData: any = new MovieDataType(Number(id), this.movieInfoForm.value['movieTitle'], this.movieInfoForm.value['movieReleaseDate'])
    movieData.releaseDate = this.dateFormat(movieData.releaseDate)
    movieData['pariticipatedActors'] = this.actorList
    if (this.movieInfoForm.status === 'VALID') {
      if (this.isEditExistingData) {
        this.movieService.updateMovie(movieData).pipe(catchError(this.movieService.handleError)).subscribe((res) => {
          this.movieService.EditingMovie = res['updatedMovie']
          this.ngOnInit()
        })
      } else {
        this.movieService.createMovie(movieData).pipe(catchError(this.movieService.handleError)).subscribe((res) => {
          this.movieService.movielist = res['movieList']
          this.movieService.movielist = this.movieService.movielist.sort((a:any, b:any) => a['id'] - b['id'])
          this.movieService.EditingMovie = this.movieService.movielist.find((item) => item.title = movieData.title)
          this.getMovieInfo()
        })
      }
    }
  }

  deleteMovie() {
    this.movieService.deleteNewMovieCreated(Number(this.newMovieCreateInfo.id)).pipe(catchError(this.movieService.handleError)).subscribe((res: any) => {
      if (res['isRemoved']) {
        this.mode = 'New'
        this.movieInfoForm.reset()
        this.newMovieCreateInfo = this.resetMovieEditData(this.newMovieCreateInfo)
        this.actorList = []
      }
    })
  }

  editCurrentMovieInfo() {
    this.movieInfoForm.patchValue({
      'movieTitle': this.movieService.EditingMovie.title,
      'movieReleaseDate': this.movieDateObject['releaseDate'].value
    })
  }

  resetMovieEditData(movieObject: any) {
    for (const key in movieObject) {
      if (Object.prototype.hasOwnProperty.call(movieObject, key)) {
        movieObject[key] = ''
      }
    }
    this.haveData = false
    return movieObject
  }

  dateFormat(value: string = '') {
    if (value) {
      return new Date(value).toLocaleDateString('en-GB')
        .split('/')
        .filter((item) => item.match(/[0-9]/g)).join('')
    }
    return ''
  }

  remove(fruit: string): void {
    const index = this.actorList.indexOf(fruit);
    if (index >= 0) {
      this.actorList.splice(index, 1);
    }
    this.filterCastedActor()
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our actor
    if (value) {
      this.actorList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.actorCtrl.setValue(null);
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.actorList.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.actorCtrl.setValue(null);
    this.filterCastedActor()
  }


  _filter(value: actorInterface): any[] {
    const filterValue = value.id;

    return this.allActors.filter(actor => actor.id === filterValue);
  }

  initSuggestionList(list: actorInterface[] = []) {
    this.allActors = list
    this.filteredActors = this.actorCtrl.valueChanges.pipe(
      startWith(null),
      map((actor: any | null) => (actor ? this._filter(actor) : this.allActors.slice())),
    );
  }

  filterCastedActor() {
    let castedActorIdList: number[] = []
    castedActorIdList = this.actorList.map((item) => item.id)
    this.movieService.getActorList().subscribe((res: any) => {
      this.initSuggestionList(res['actorList'].filter((item: actorInterface) => !castedActorIdList.includes(item.id)))
    })
  }

  getCastedActor() {
    let castedActorIdList: number[] = []
    this.movieService.getParticipatedActor(Number(this.newMovieCreateInfo.id)).subscribe((res: any) => {
      if (res['actorList'].length > 0) {
        this.actorList = res['actorList']
        castedActorIdList = this.actorList.map((item) => item.id)
        this.movieService.getActorList().subscribe((res: any) => {
          this.initSuggestionList(res['actorList'].filter((item: actorInterface) => !castedActorIdList.includes(item.id)))
        })
      } else {
        this.movieService.getActorList().subscribe((res: any) => {
          this.initSuggestionList(res['actorList'])
        })
      }
    })
  }


  modeChangeEvent(event: any) {
    console.log(event.value)
    switch (event.value) {
      case 'New':
        this.mode = 'New'
        this.movieInfoForm.reset()
        this.actorList = []
        this.movieService.getActorList().subscribe((res: any) => {
          this.initSuggestionList(res['actorList'])
        })
        this.isEditExistingData = false
        break;
      case 'Edit':
        this.mode = 'Edit'
        this.editCurrentMovieInfo()
        this.isEditExistingData = true
        break
      case 'Save':
        this.onSubmit()
        this.isEditExistingData = false
        break
      case 'Delete':
        this.deleteMovie()
        this.isEditExistingData = false
        break
      case 'BackToList':
        this.store.dispatch(toggleCreateBtn({
          isDisplay: true
        }))
        this.router.navigate(['movies/movies-list'])
        break;
      default:
        break;
    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.movieService.resetObservableList()
  }

}
