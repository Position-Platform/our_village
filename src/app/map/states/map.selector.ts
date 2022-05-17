import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromMap from "./map.reducer";


export const selectMapState =
  createFeatureSelector<fromMap.MapState>(
    fromMap.mapFeatureKey
  );

  export const selectIsLocation = createSelector(
    selectMapState,

    (state: fromMap.MapState) => state.isLocation
  );
