import { Statement } from '@angular/compiler';
import { Action, createReducer, on } from '@ngrx/store';
import actorInterface from 'src/data-type/actor.interface';
import * as movieAction from './movie.action';

export const initialState: any = {
  isDisplay:false
};

export const movieReducer = createReducer(
  initialState,
  on(movieAction.toggleCreateBtn, (state, payload) => {
    return {...state, isDisplay: payload['isDisplay']}
  })
)
