import { catchError } from 'rxjs';
import {Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/service/movie-service/movie.service';
import { Store } from '@ngrx/store';
import { isBtnDisplay } from './movie-store/movie.selector';
import { AuthService } from 'src/service/auth-service/auth.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit, OnDestroy {
  isCreating:boolean = false
  constructor(public router:Router, private movieService:MovieService, public store:Store, public authService:AuthService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.router.navigate(['movies/movies-list'])
    // const BtnToggleEmitterSubscribe = this.movieService.getObservable('BtnToggleEmitter').subscribe((object) => {
    //   if (object.logic === 'toggleCreateBtn') {
    //     this.isCreating = object.sentData
    //   } else {
    //     this.isCreating = false
    //   }
    // })
    this.store.select(isBtnDisplay).subscribe((res) => {
      this.isCreating = res['isDisplay']
    })
    // this.movieService.observableList.push(BtnToggleEmitterSubscribe)
    this.searchMovieName('')
  }

  searchMovieName(movieName:any) {
    let createModeUrl = 'movies-detail'
    if (this.router.url.indexOf(createModeUrl) > -1 && movieName.value) {
      this.movieService.getSingleMovie(movieName.value).pipe(catchError(this.movieService.handleError)).subscribe((res) => {
        this.movieService.movielist = res.movieList
        this.movieService.EditingMovie = res.movieList[0]
        let data = {
          'logic':'editDetail',
          sentData: res.movieList
        }
        this.movieService.observableSendData(data)
      },
      (e) => {
        console.log(e)
        this.movieService.EditingMovie = null
        let data = {
          'logic':'editDetail',
          sentData: []
        }
        this.movieService.observableSendData(data)
      })
    } else {
      this.movieService.getSingleMovie(movieName.value).pipe(catchError(this.movieService.handleError)).subscribe((res) => {
        this.movieService.movielist = res.movieList
        let data = {
          'logic':'sendList',
          sentData: res.movieList
        }
        this.movieService.observableSendData(data)
        this.router.navigate(['movies/movies-list'])
      }, (e) => {
        console.log(e)
        let data = {
          'logic':'sendList',
          sentData: []
        }
        this.movieService.observableSendData(data)
      })
    }
  }

  transitToCreateScreen() {
    let data = {
      logic:'sendMode',
      sentData: 'createNewMovie'
    }
    this.isCreating = true
    this.movieService.observableSendData(data)
    this.router.navigate(['movies/create/movies-detail'])
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.movieService.resetObservableList()
  }
}
