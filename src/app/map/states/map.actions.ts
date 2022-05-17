import { createAction, props } from "@ngrx/store";

export const GETLOCATION = '[Map] Retrieve Location';

export const getLocation = createAction(GETLOCATION, props<any>());



