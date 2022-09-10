import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription, throwError } from 'rxjs';
import { createActor } from 'src/component/actor-page/actor-store/actor.action';
import { ActorInfo } from 'src/data-type/actor';
import actorInterface from 'src/data-type/actor.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  searchedActorList:actorInterface[] = []
  actorEmitter:BehaviorSubject<any> =  new BehaviorSubject({})
  public observableList:Subscription[] = []
  constructor(private http:HttpClient, private store:Store) { }

  getActorList (searchInfo:any) {
    if (searchInfo) {
      return this.http.post<actorInterface>(`${environment.baseUrl}actors-filter`, JSON.stringify(searchInfo))
    } else {
      return this.http.get<actorInterface>(`${environment.baseUrl}actors-all`)
    }
  }

  createActor(actorDetail:any) {
    return this.http.post<actorInterface>(`${environment.baseUrl}actors`, JSON.stringify(actorDetail))
    // this.store.dispatch(createActor({actorInfo: actorDetail}))
  }

  editActorAction(actorDetail:any) {
    let data = {
      actor_id: actorDetail.id
    }
    return this.http.patch<actorInterface>(this.concateDatatoApiEndpoints(`${environment.baseUrl}actors-update-info`, data ), JSON.stringify(actorDetail))
  }

  removeActorAcion(actorId:number = -1) {
    let data = {
      actor_id: actorId
    }
    return this.http.delete<actorInterface>(this.concateDatatoApiEndpoints(`${environment.baseUrl}actors-eviction`, data ))
  }



  concateDatatoApiEndpoints (api:string = '', data:any = {}) {
    api = api + '?'
    Object.entries(data).forEach((item:any) => {
      api +=`${item[0]}=${(item[1]) ? item[1] : ''}`
    })
    return api
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
