import { Statement } from '@angular/compiler';
import { Action, createReducer, on } from '@ngrx/store';
import actorInterface from 'src/data-type/actor.interface';
import * as actorAction from './actor.action';

export const initialState: any = {
  actorList:[],
  actorInfo: {}
};

export const actorReducer = createReducer(
  initialState,
  on(actorAction.getAllActorList, (state, payload) => {
    return {...state, actorList: payload['actorList']}
  }),
  on(actorAction.createActor, (state, payload) => {
    return {...state, actorList: payload['newActorList']}
  }),
  on(actorAction.editActor, (state, payload) => {
    return {...state, actorInfo: payload['actorInfo']}
  })
)
