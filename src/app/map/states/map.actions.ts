import { createAction, props } from '@ngrx/store';

export const GETLOCATION = '[Map] Retrieve Location';
export const ZOOM_PLUS = '[Map] Zoom Plus';
export const ZOOM_MINUS = '[Map] Zoom Minus';
export const ZOOM_TO_LOCATION = '[Map] Zoom To Location';

export const getLocation = createAction(GETLOCATION, props<any>());
export const zoomPlus = createAction(ZOOM_PLUS);
export const zoomMinus = createAction(ZOOM_MINUS);
export const zoomToLocation = createAction(ZOOM_TO_LOCATION, props<any>());
