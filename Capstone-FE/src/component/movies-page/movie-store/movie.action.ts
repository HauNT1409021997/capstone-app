import { createAction, props } from '@ngrx/store';

export const movieActionType = {
  toggleCreateBtn: '[Movie] ToggleCreateBtn',
  createActor: '[Actor] createActor',
  editActor: '[Actor] editActor'
}

export const toggleCreateBtn = createAction(
  movieActionType['toggleCreateBtn'],
  props<{isDisplay:boolean}>()
);

