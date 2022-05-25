import { Feature, Geolocation, Map, Point, Style, VectorLayer, VectorSource } from 'src/app/core/modules/ol';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map as geoportailMap } from './../components/map/map.component';
import { transform } from 'ol/proj';
import { SearchInterface } from 'src/app/layouts/searchbar-layout/interfaces/search';

@Injectable()
export class MapHelper {
  map: Map | undefined;
  environment = environment;
  geolocation: Geolocation | undefined;

  constructor(map?: Map) {
    if (map) {
      this.map = map;
    } else {
      this.map = geoportailMap;
    }
    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      },
      tracking: true,
      projection: this.map?.getView().getProjection()
    });
  }

  initialiserLayerGeoLocalisation() {
    let geolocalisationLayer = new VectorLayer({
      // @ts-ignore

      nom: 'user_position',
      source: new VectorSource({})
    });
    geolocalisationLayer.setZIndex(99999999);
    this.map?.addLayer(geolocalisationLayer);
    this.map?.renderSync();
  }

  geolocateUser(): boolean {
    if (this.getLayerByName('user_position').length == 0) {
      this.initialiserLayerGeoLocalisation();
    }
    let geolocalisationLayer = this.getLayerByName('user_position')[0];
    geolocalisationLayer.getSource().clear();

    let positionFeature = new Feature();
    positionFeature.setStyle([new Style({})]);
    this.geolocation?.once('change:position', () => {
      var coordinates = this.geolocation?.getPosition();
      localStorage.setItem('longitude', coordinates![0].toString());
      localStorage.setItem('latitude', coordinates![1].toString());
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : undefined);
      if (coordinates) {
        this.fit_view(new Point(coordinates), environment.zoomLocation);
      }
    });

    this.geolocation?.on('error', (e: any) => {
      console.error(e);
      return false;
    });

    geolocalisationLayer.getSource().addFeature(positionFeature);

    return true;
  }

  // Get Map BBox

  getBboxInMap() {
    var bboxMap = this.map?.getView().calculateExtent(this.map.getSize()).toString().split(',');

    var Amin = transform([parseFloat(bboxMap![0]), parseFloat(bboxMap![1])], 'EPSG:3857', 'EPSG:4326');
    var Amax = transform([parseFloat(bboxMap![2]), parseFloat(bboxMap![3])], 'EPSG:3857', 'EPSG:4326');

    var bbox = {
      min: {
        lon: Amin[0],
        lat: Amin[1]
      },
      max: {
        lon: Amax[0],
        lat: Amax[1]
      }
    };

    return bbox;
  }

  // zoom to coordinates
  fit_view(geom: Point, zoom: number, duration?: number) {
    this.map?.getView().fit(geom, {
      maxZoom: zoom,
      size: this.map?.getSize(),
      padding: [0, 0, 0, 0],
      duration: duration ?? 1000
    });
  }

  getAllLAyerInMap(): Array<any> {
    var responseLayers = Array();
    this.map?.getLayers().forEach(group => {
      responseLayers.push(group);
    });
    return responseLayers;
  }

  getLayerByName(name: string, isLayerGroup: boolean = false): Array<any> {
    var layer_to_remove = [];

    if (isLayerGroup) {
      var all_layers = this.map?.getLayers().getArray();
    } else {
      var all_layers = this.map?.getLayerGroup().getLayers().getArray();
    }

    for (let index = 0; index < all_layers!.length; index++) {
      var layer = all_layers![index];
      if (layer.get('nom') == name) {
        layer_to_remove.push(layer);
      }
    }
    return layer_to_remove;
  }

  addMapZoomAnimation = (zoom: number) => {
    this.map?.getView().animate({
      zoom: zoom,
      duration: 1000
    });
  };

  zoomIntoClusterLayer(layer: VectorLayer) {
    let extent = layer.getSource().getExtent();
    //@ts-ignore
    this.fit_view(extent, this.map?.getView().getZoom()! + 1);
  }

  zoomSelectedResult(result: SearchInterface) {
    console.log(result);
  }
}
