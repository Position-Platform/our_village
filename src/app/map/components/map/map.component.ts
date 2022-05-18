import { Observable } from 'rxjs';
import { OnInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TileLayer, XYZ, Map, View } from 'src/app/core/modules/ol';
import { environment } from 'src/environments/environment';
import { MapState } from '../../states/map.reducer';
import { selectIsLocation } from '../../states/map.selector';
import { GETLOCATION } from '../../states/map.actions';

export const map = new Map({
  layers: [
    new TileLayer({
      source: new XYZ({
        crossOrigin: 'anonymous',
        url: environment.layers.street,
        attributionsCollapsible: false,
        attributions: ' © Powered by <a target="_blank" href="https://position.cm"> Position </a> '
      })
    })
  ],

  view: new View({
    center: [0, 0],
    zoom: 6
  })
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  isLocation$: Observable<boolean>;
  constructor(private store: Store<MapState>) {
    this.isLocation$ = this.store.select(selectIsLocation);
  }

  ngOnInit(): void {
    this.initialiazeMap();
    this.store.dispatch({ type: GETLOCATION });

    this.isLocation$.subscribe(isLocation => {
      if (isLocation) {
        this.initialiazeMap();
      }
    });
  }

  initialiazeMap() {
    map.setTarget('map');
  }
}
