import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { StoreModule } from '@ngrx/store';
import { mapFeatureKey, reducer } from './states/map.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(mapFeatureKey, reducer),
    StoreModule.forRoot(reducer),
  ],
  declarations: [MapComponent],
})
export class MapModule {}
