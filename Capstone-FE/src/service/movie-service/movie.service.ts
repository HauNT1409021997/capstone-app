import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subscription, throwError } from 'rxjs';
import actorInterface from 'src/data-type/actor.interface';
import {  MovieDataType } from 'src/data-type/movie';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public movielist:MovieDataType[] = []
  public EditingMovie!:any
  private movieEmitter:BehaviorSubject<any> = new BehaviorSubject('');
  private BtnToggleEmitter:BehaviorSubject<any> = new BehaviorSubject('');
  public observableList:Subscription[] = []
  constructor(private http:HttpClient) { }

  getSingleMovie(movieName:string = '') {
    return this.http.get<any>(`${environment.baseUrl}movies?movieName=${movieName}`)
  }

  getMovieList() {
    return this.http.get<any>(`${environment.baseUrl}movies`)
  }

  getActorList () {
    return this.http.get<actorInterface>(`${environment.baseUrl}actors-all`)
  }

  getParticipatedActor (id:number = 0) {
    return this.http.get<actorInterface>(`${environment.baseUrl}casted-actors?movieId=${id}`)
  }

  getNewMovieCreated() {
     return new MovieDataType(this.movielist[0].id,this.movielist[0].title, this.movielist[0].releaseDate)
  }

  createMovie(movieData:MovieDataType|undefined = undefined){
    return this.http.post<any>(`${environment.baseUrl}movies`,JSON.stringify(movieData))
  }

  updateMovie(movieData:MovieDataType|undefined = undefined) {
    return this.http.patch<any>(`${environment.baseUrl}movies-update-info?movie_id=${movieData?.id}`, JSON.stringify(movieData))
  }

  deleteNewMovieCreated (id:number = 0) {
    return this.http.delete(`${environment.baseUrl}movies-eviction?movie_id=${id}`)
  }

  observableSendData (data:{} = {}, type:string = '') {
    switch (type) {
      case 'movieEmitter':
        this.movieEmitter.next(data)
        break;
      case 'BtnToggleEmitter':
        this.BtnToggleEmitter.next(data)
        break;
      default:
        this.movieEmitter.next(data)
        break;
    }
  }


  convertStringToDateDataType(data:any[] = [], key:string[] = [], object:any ={}) {
    key.forEach((item:string ,index:number) => {
      const day:any = (data[index].slice(0, 2)) ? Number(data[index].slice(0, 2)) : '--'
      const month:any = (data[index].slice(2, 4)) ? Number(data[index].slice(2, 4)) - 1 : '--'
      const year:any = (data[index].slice(4, 8)) ? Number(data[index].slice(4, 8)) : '----'
      if ([typeof(day), typeof(month), typeof(year)].includes('number')) {
        object[item] = {
          value: new Date(year, month, day),
          isDateValue: true
        }
      } else {
        object[item] = {
          value: `${day}/${month}/${year}`,
          isDateValue: false
        }
      }
    })
    return object
  }

  getObservable (type:string = '') {
    switch (type) {
      case 'movieEmitter':
        return this.movieEmitter
        break;
      case 'BtnToggleEmitter':
        return this.BtnToggleEmitter
        break;
      default:
        return this.movieEmitter
        break;
    }
  }

  resetObservableList () {
    this.observableList.forEach((item:Subscription) => {
      item.unsubscribe()
    })
  }

  handleError(error:HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
