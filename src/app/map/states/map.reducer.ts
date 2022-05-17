import { Action, createReducer, on } from '@ngrx/store';
import { MapHelper } from '../helpers/mapHelper';
import { getLocation } from './map.actions';

export const mapFeatureKey = 'map';



export interface MapState {
 isLocation : boolean;
}

export const initialState: MapState = {
  isLocation: false,
};

export const mapReducer = createReducer(
  initialState,
  on(getLocation, (state) => {
    var mapHelper = new MapHelper();
    return {
      ...state,
      isLocation: mapHelper.geolocateUser(),
    };
  }),
);

export function reducer(
  state: MapState | undefined,
  action: Action
): any {
  return mapReducer(state, action);
}

