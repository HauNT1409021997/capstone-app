import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { catchError } from 'rxjs';
import { ActorInfo } from 'src/data-type/actor';
import actorInterface from 'src/data-type/actor.interface';
import { ActorService } from 'src/service/actor-service/actor.service';
import { Store } from '@ngrx/store';
import { getAllActorList } from './actor-store/actor.action';
import { AuthService } from 'src/service/auth-service/auth.service';

@Component({
  selector: 'app-actor-page',
  templateUrl: './actor-page.component.html',
  styleUrls: ['./actor-page.component.scss']
})
export class ActorPageComponent implements OnInit {
  genderList:string[] = ['Male', 'Female']
  numberRegex = /^[1-9]\d*$/g
  nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
  ChosenGender:string = 'Male'
  actorAgeDisplay:string = '10'
  actorInfoSearchForm:FormGroup = new FormGroup<any>({})
  constructor(public router:Router, public actorService:ActorService, private store:Store, public authService:AuthService) { }

  ngOnInit(): void {
    this.router.navigate(['actors/actor-list'])
    this.initializeSearchForm()
    this.getAllList()
  }

  initializeSearchForm() {
    this.actorInfoSearchForm = new FormGroup({
      'actorName': new FormControl('',[Validators.pattern(this.nameRegex)]),
      'actorGender': new FormControl('',[]),
      'actorAge': new FormControl('10',[Validators.pattern(this.numberRegex)])
    })
  }


  getAllList() {
    this.actorService.getActorList('').pipe(catchError(this.actorService.handleError)).subscribe((res:any) => {
      this.actorService.searchedActorList = res['actorList']
      this.store.dispatch(getAllActorList({actorList:res['actorList']}))
      this.actorService.actorEmitter.next('getActorList')
    })
  }

  setGender (gender:any) {
    this.actorInfoSearchForm.patchValue({
      'actorGender': this.deepClone(gender)
    })
  }

  onSubmit () {
    console.log('run search', this.actorInfoSearchForm)
    const actorSearchInfo  = {
      name: this.actorInfoSearchForm.value['actorName'],
      gender: this.actorInfoSearchForm.value['actorGender'],
      age: this.actorInfoSearchForm.value['actorAge']
    }
    const isSearch = Object.entries(actorSearchInfo).some((item) => {
      if (item[0] !== 'age' && item[1] ) {
        return true
      } else if (item[0] == 'age' && item[1] !== '10') {
        return true
      }
      return false
    })
    if (isSearch) {
      this.actorService.getActorList(actorSearchInfo).pipe(catchError(this.actorService.handleError)).subscribe((res:any) => {
        this.actorService.searchedActorList = res['actorList']
        this.store.dispatch(getAllActorList({actorList:res['actorList']}))
        this.actorService.actorEmitter.next('getActorList')
      })
    } else {
      this.actorService.getActorList('').pipe(catchError(this.actorService.handleError)).subscribe((res:any) => {
        this.actorService.searchedActorList = res['actorList']
        this.store.dispatch(getAllActorList({actorList:res['actorList']}))
        this.actorService.actorEmitter.next('getActorList')
      })
    }
  }

  transitToCreateMode() {
    this.actorService.actorEmitter.next('Create')
    this.router.navigate(['actors/actor-detail'])
  }

  deepClone (value:any) {
    return JSON.parse(JSON.stringify(value))
  }

}
