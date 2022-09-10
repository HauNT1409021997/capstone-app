import { ActorService } from './../../../service/actor-service/actor.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import actorInterface from 'src/data-type/actor.interface';
import { catchError, map } from 'rxjs';
import { createActor } from '../actor-store/actor.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { editingActor, selectAllActor } from '../actor-store/actor.selector';
import { E } from '@angular/cdk/keycodes';
import { AuthService } from 'src/service/auth-service/auth.service';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.scss']
})
export class ActorDetailComponent implements OnInit, OnDestroy {
  nameRegex:RegExp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
  numberRegex:RegExp = /^\d+$/g
  genderList:string[] = ['Male', 'Female']
  actingCategories:string[] = ['Comedy', 'Action', 'Thriller', 'Science Fiction', 'Psychology ']
  editingActorInfo!:actorInterface
  mode:string = 'New'
  actorInfoForm:any = new FormGroup({})
  constructor(public actorService:ActorService, private store:Store, public router:Router, public authService:AuthService) { }
  ngOnInit(): void {
    this.initializeForm()
    const editActorObservable =  this.actorService.actorEmitter.subscribe((res) => {
      if (res === 'Edit Actor') {
        this.store.select(editingActor).subscribe((res) => {
          this.editingActorInfo = res
          this.modeChangeEvent(this.mode = 'Edit')
        })
      } else {
        this.mode = 'New'
      }
    })
    this.actorService.observableList.push(editActorObservable)
  }

  initializeForm() {
    this.actorInfoForm = new FormGroup({
      'actorName': new FormControl('',[Validators.required]),
      'actorAge': new FormControl('',[Validators.required]),
      'actorGender': new FormControl('',[Validators.required])
    })
  }

  editInfo() {
    this.actorInfoForm.patchValue({
      'actorName': this.editingActorInfo.name,
      'actorAge': this.editingActorInfo.age,
      'actorGender': this.editingActorInfo.gender
    })
  }

  onSubmit() {
    console.log(this.actorInfoForm)
    let updateActorList:actorInterface[] = []
    if (this.actorInfoForm.status === 'VALID') {
      if (this.mode === 'New') {
        let newActor = {
          id: 0,
          name: this.actorInfoForm.value['actorName'],
          age: this.actorInfoForm.value['actorAge'],
          gender: this.actorInfoForm.value['actorGender']
        }
        this.actorService.createActor(newActor).pipe(catchError(this.actorService.handleError)).subscribe((res:any) => {
          this.store.dispatch(createActor({newActorList: res['actorList']}))
          this.actorService.actorEmitter.next('getActorList')
          this.router.navigate(['/actors/actor-list'])
        })
      } else if (this.mode === 'Edit') {
        let editActorData = {
          id: this.editingActorInfo.id,
          name: this.actorInfoForm.value['actorName'],
          age: this.actorInfoForm.value['actorAge'],
          gender: this.actorInfoForm.value['actorGender']
        }
        this.store.select(selectAllActor).pipe(map(value => value.actorStore.actorList)).subscribe((res) => {
          updateActorList = JSON.parse(JSON.stringify(res))
        })
        this.actorService.editActorAction(editActorData).pipe(catchError(this.actorService.handleError)).subscribe((res:any) => {
          let index = updateActorList.findIndex((item:actorInterface) => Number(item.id) === res['updatedActor'].id)
          let temp = updateActorList[0]
          if (index > -1 && index !== 0) {
            updateActorList[0] = res['updatedActor']
            updateActorList[index] = temp
          } else {
            updateActorList[0] = res['updatedActor']
          }
          this.store.dispatch(createActor({newActorList: updateActorList}))
          this.actorService.actorEmitter.next('EditActorList')
          this.router.navigate(['/actors/actor-list'])
        })
      }
    }
  }

  removeActor() {
    this.actorService.removeActorAcion(this.editingActorInfo.id).pipe(catchError(this.actorService.handleError)).subscribe((res:any) => {
      this.store.dispatch(createActor({newActorList: res['actorList']}))
      this.actorService.actorEmitter.next('EditActorList')
      this.router.navigate(['actors/actor-list'])
    })
  }

  ReturnToList() {
    this.router.navigate(['actors/actor-list'])
  }

  modeChangeEvent(value:string = '') {
    switch (value) {
      case 'Edit':
        this.editInfo()
        break;
      case 'Delete':
        this.removeActor()
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.actorService.resetObservableList()
  }

}
