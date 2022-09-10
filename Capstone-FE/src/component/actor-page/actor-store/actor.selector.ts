import { createSelector, createFeatureSelector } from '@ngrx/store';
import actorInterface from 'src/data-type/actor.interface';

export const selectAllActor = (state:any) => state
export const editingActor = (state:any) => state?.actorStore?.actorInfo

