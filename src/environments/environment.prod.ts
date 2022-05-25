export const environment = {
  production: true,
  layers: {
    street:
      'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2F1dHk5NiIsImEiOiJjanN4aDd2cG8wMmw3NDRwaDc2cnc2OXJwIn0.YRVVo-3FkQtfkMPH4lt2hw',
    satellite:
      'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2F1dHk5NiIsImEiOiJjanN4aDd2cG8wMmw3NDRwaDc2cnc2OXJwIn0.YRVVo-3FkQtfkMPH4lt2hw',
    dark: 'https://tile.jawg.io/dark/{z}/{x}/{y}.png?api-key=KEzgT1q0xEDQ06n23POIRMJqrtuHZOoo4FPNm1GfrNEzEOcnaQxuznduTbaAvGg3',
    osm: 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  zoomLocation: 16,

  avaible_language: ['fr', 'en'],
  default_language: 'fr',
  url_services: 'https://servicesdev.position.cm',
  url_images: 'https://service.geo.sm/var/www',
  primaryColor: '#05BF95',
  apiKey: 'KAJwm1CGJsKb33bxDaTHARdv1nC9BGoIgUzaAjp4IuGwOMK1KbQZyxO4wtUo1pes',
  firebaseApiKey: 'AIzaSyDFnJZLnSb3iAOARbf_XiBYOCIkDePXx7Y'
};
