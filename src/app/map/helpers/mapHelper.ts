import {
  CircleStyle,
  Cluster,
  Feature,
  Fill,
  Geolocation,
  Icon,
  Map,
  Point,
  Stroke,
  Style,
  Text,
  TileLayer,
  VectorLayer,
  VectorSource,
  XYZ
} from 'src/app/core/modules/ol';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map as geoportailMap } from './../components/map/map.component';
import { transform } from 'ol/proj';

const typeLayer = ['vector', 'cluster', 'xyz'];

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

  //Construct Layer
  constructLayer(type: string, source: VectorSource, name: string, style?: Style, color?: string, logo?: string) {
    var layer;
    if (type === 'vector') {
      layer = new VectorLayer({
        source: source,
        style: style,
        //@ts-ignore
        nom: nom,
        type_layer: 'vector'
      });
    } else if (type === 'xyz') {
      layer = new TileLayer({
        source: new XYZ({
          crossOrigin: 'anonymous',
          url: this.environment.layers.osm,
          attributionsCollapsible: false,
          attributions: ' © Powered by <a target="_blank" href="https://position.cm"> Position </a> '
        }),
        //@ts-ignore
        nom: nom,
        type_layer: 'xyz'
      });
    } else if (type === 'cluster') {
      var clusterSource = new Cluster({
        distance: 80,
        source: source
      });

      layer = new VectorLayer({
        source: clusterSource,
        style: function (feature) {
          const size = feature.get('features').length;
          if (size != 1) {
            //@ts-ignore
            let style = styleCache[size];
            if (!style) {
              style = new Style({
                image: new CircleStyle({
                  radius: 18,
                  stroke: new Stroke({
                    color: '#fff'
                  }),
                  fill: new Fill({
                    color: color
                  })
                }),
                text: new Text({
                  font: '15px Calibri,sans-serif',
                  text: size.toString(),
                  fill: new Fill({
                    color: '#fff'
                  })
                })
              });
              //@ts-ignore
              styleCache[size] = style;
            }
            return style;
          } else {
            var styleDefaultII = new Style({
              image: new Icon({
                scale: 1.2,
                src: logo
              })
            });

            return styleDefaultII;
          }
        },
        //@ts-ignore
        nom: name,
        type_layer: 'cluster'
      });
    }

    return layer;
  }

  // Add Layer to Map
  addLayerToMap(layer: VectorLayer | TileLayer) {
    if (!layer.get('nom')) {
      throw new Error("Layer must have a 'nom' properties");
    }

    if (!layer.get('type_layer')) {
      throw new Error("Layer must have a 'type_layer' properties");
    }

    if (typeLayer.indexOf(layer.get('type_layer')) == -1) {
      throw new Error("Layer must have a 'type_layer' properties among " + typeLayer.join(','));
    }

    this.map?.addLayer(layer);
    this.map?.renderSync();
  }

  removeLayerToMap(layer: VectorLayer | TileLayer) {
    this.map?.removeLayer(layer);
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
}
