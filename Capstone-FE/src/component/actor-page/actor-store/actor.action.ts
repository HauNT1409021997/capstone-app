import { createAction, props } from '@ngrx/store';
import actorInterface from 'src/data-type/actor.interface';

export const actorActionType = {
  getAllList: '[Actor] getAllList',
  createActor: '[Actor] createActor',
  editActor: '[Actor] editActor'
}

export const getAllActorList = createAction(
  actorActionType['getAllList'],
  props<{actorList:actorInterface[]}>()
);

export const createActor = createAction(
  actorActionType['createActor'],
  props<{newActorList:actorInterface[]}>()
);

export const editActor = createAction(
  actorActionType['editActor'],
  props<{actorInfo:actorInterface}>()
);
