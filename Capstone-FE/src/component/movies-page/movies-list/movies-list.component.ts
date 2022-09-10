import { MovieService } from 'src/service/movie-service/movie.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDataType } from 'src/data-type/movie';
import { toggleCreateBtn } from '../movie-store/movie.action';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/service/auth-service/auth.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  filmList:MovieDataType[] = []
  paginationList:any[] = []
  filmListlength:number = 0
  currentPage:number = 0
  pageSizeOption:number[] = [1, 2]
  pageSize:number = 1
  formattedReleaseDate:any[] = []
  constructor(public router:Router,
    private movieService:MovieService,
    public store:Store,
    public authService:AuthService) {
    this.store.dispatch(toggleCreateBtn({isDisplay: false}))
   }

  ngOnInit(): void {
    this.getMovieList()
  }

  getMovieList() {
    this.formattedReleaseDate = []
    const  getMovieList = this.movieService.getObservable().subscribe((object) => {
      console.log(object)
      if (object.logic === 'sendList') {
        this.filmList = object.sentData || []
        this.filmList.forEach((item:MovieDataType) => {
          this.formattedReleaseDate.push(this.movieService.convertStringToDateDataType([item.releaseDate], ['releaseDate']))
        })
        this.filmListlength = object.sentData.length
        if (this.filmListlength > 0) {
          this.changePage()
        }
        this.paginationList = object.sentData
      } else {
        this.movieService.getMovieList().subscribe((res) => {
          this.filmList = res['movieList'] || []
          this.filmList.forEach((item:MovieDataType) => {
            this.formattedReleaseDate.push(this.movieService.convertStringToDateDataType([item.releaseDate], ['releaseDate']))
          })
          this.filmListlength = res['movieList'].length
          this.paginationList = res['movieList']
          if (this.filmListlength > 0) {
            this.changePage()
          }
        })
      }
    })
    this.movieService.observableList.push(getMovieList)
  }

  routeNavigate(movieIndex:number) {
    // this.movieService.observableSendData({logic:'toggleCreateBtn', sentData: true}, 'BtnToggleEmitter')
    this.store.dispatch(toggleCreateBtn({isDisplay: true}))
    this.movieService.observableSendData({logic:'sendMode', sentData: 'EditMovie'}, 'movieEmitter')
    this.movieService.EditingMovie = this.filmList.find((item) => item.id === this.paginationList[movieIndex].id)
    this.router.navigate([`movies/${this.paginationList[movieIndex].id}/movies-detail`])
  }

  changePage(event:any = undefined) {
    new Promise<void>((resolve) => {
      resolve()
    }).then(() => {
      if (event) {
        this.currentPage = event.pageIndex
        this.pageSize = event.pageSize
      }
      const tempList = this.formattedReleaseDate
      const start = this.currentPage * this.pageSize;
      const end = (this.currentPage + 1) * this.pageSize;
      this.paginationList= JSON.parse(JSON.stringify(this.filmList.slice(start, end)));
      this.formattedReleaseDate.slice(start, end).forEach((item, index) => {
        this.paginationList[index].releaseDate = item.releaseDate
      })
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.movieService.resetObservableList()
  }

}
