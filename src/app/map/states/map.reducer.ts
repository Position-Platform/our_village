import { Action, createReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { MapHelper } from '../helpers/mapHelper';
import { getLocation, zoomMinus, zoomPlus, zoomToLocation } from './map.actions';

export const mapFeatureKey = 'map';

export interface MapState {
  isLocation?: boolean;
}

export const initialState: MapState = {
  isLocation: false
};

export const mapReducer = createReducer(
  initialState,
  on(getLocation, state => {
    var mapHelper = new MapHelper();
    return {
      ...state,
      isLocation: mapHelper.geolocateUser()
    };
  }),
  on(zoomPlus, state => {
    var mapHelper = new MapHelper();
    mapHelper.addMapZoomAnimation(mapHelper.map?.getView().getZoom()! + 1);
    return { ...state };
  }),
  on(zoomMinus, state => {
    var mapHelper = new MapHelper();
    mapHelper.addMapZoomAnimation(mapHelper.map?.getView().getZoom()! - 1);
    return { ...state };
  }),
  on(zoomToLocation, state => {
    var mapHelper = new MapHelper();
    let featurePosition = mapHelper.getLayerByName('user_position')[0].getSource().getFeatures()[0];
    mapHelper.fit_view(featurePosition.getGeometry(), environment.zoomLocation);
    return { ...state };
  })
);

export function reducer(state: MapState | undefined, action: Action): any {
  return mapReducer(state, action);
}
