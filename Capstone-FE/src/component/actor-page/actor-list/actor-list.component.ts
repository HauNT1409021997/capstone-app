import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, pluck } from 'rxjs';
import { ActorInfo } from 'src/data-type/actor';
import actorInterface from 'src/data-type/actor.interface';
import { ActorService } from 'src/service/actor-service/actor.service';
import { AuthService } from 'src/service/auth-service/auth.service';
import { editActor } from '../actor-store/actor.action';
import {  selectAllActor } from '../actor-store/actor.selector';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.scss']
})
export class ActorListComponent implements OnInit, OnDestroy {

  actorInfo:actorInterface[] = []
  actorListLength:number = 0
  infoList:string [] = ['name', 'age', 'gender']
  infoTitle:string [] = ['Name', 'Gender', 'Age']
  constructor(public router:Router, public actorService:ActorService, private store:Store, public authService:AuthService) { }

  ngOnInit(): void {
    const getActorListObservable =  this.actorService.actorEmitter.subscribe((res) => {
      switch (res) {
        case 'getActorList':
          this.store.select(selectAllActor).pipe(map(value => value.actorStore.actorList)).subscribe((res) => {
            this.actorInfo = res
            this.actorListLength = res.length
          })
          break;
        case 'EditActorList':
          this.store.select(selectAllActor).pipe(map(value => value.actorStore.actorList)).subscribe((res) => {
            this.actorInfo = res
            this.actorListLength = res.length
          })
          break;
        default:
          this.store.select(selectAllActor).pipe(map(value => value.actorStore.actorList)).subscribe((res) => {
            this.actorInfo = res
            this.actorListLength = res.length
          })
          break;
      }
    })
    this.actorService.observableList.push(getActorListObservable)
  }

  navigateToDetails() {
    this.actorService.actorEmitter.next('Edit Actor')
    this.router.navigate(['/actors/actor-detail'])
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.actorService.resetObservableList()
  }
}
