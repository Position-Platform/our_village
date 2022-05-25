import { Datum as Data } from './../../../categories/interfaces/categories';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Datum } from '../interfaces/searchModel';
import { Nominatim } from '../interfaces/nominatim';
import { SearchInterface } from '../interfaces/search';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private apiService: ApiService) {}

  searchEtablissement(query: string): Observable<SearchInterface[]> {
    return from(this.apiService.getRequest('/api/search/etablissements?q=' + query)).pipe(
      map((data: any) => {
        const results: SearchInterface[] = [];
        data.data.forEach((element: Datum) => {
          var logo = '';
          if (element.logo !== null) {
            logo = environment.url_images + element.logo;
          } else if (element.sous_categories[0].logourl !== null) {
            logo = environment.url_images + element.sous_categories[0].logourl;
          } else {
            logo = environment.url_images + element.sous_categories[0].categorie.logourl;
          }
          results.push({
            type: 'etablissement',
            name: element.nom,
            logo_src: logo,
            details: element.sous_categories[0].nom,
            ...element
          });
        });
        return results;
      }),
      catchError(err => {
        throw new Error(err);
      })
    );
  }

  searchCategories(query: string): Observable<SearchInterface[]> {
    return from(this.apiService.getRequest('/api/search/categories?q=' + query)).pipe(
      map((data: any) => {
        const results: SearchInterface[] = [];
        data.data.forEach((element: Data) => {
          results.push({
            type: 'categorie',
            name: element.nom,
            logo_src: environment.url_images + element.logourl,
            details: 'categories',
            ...element
          });
        });
        return results;
      }),
      catchError(err => {
        throw new Error(err);
      })
    );
  }

  searchNominatim(query: string): Observable<SearchInterface[]> {
    return from(
      this.apiService.getRequestFromOtherHost(
        'https://nominatim.openstreetmap.org/search?q=' + query + '&format=json&polygon=0&addressdetails=1&countrycodes=cm'
      )
    ).pipe(
      map((data: any) => {
        const results: SearchInterface[] = [];
        data.forEach((element: Nominatim) => {
          results.push({
            name: element.display_name,
            id: element.osm_id,
            type: 'nominatim',
            lat: element.lat,
            lng: element.lon,
            bbox: element.boundingbox,
            logo_src: element.icon ?? 'assets/icons/svg/icon-position-pin.svg',
            details: element.address.road + ' ' + element.address.city + ' ' + element.address.country
          });
        });
        return results;
      }),
      catchError(err => {
        throw new Error(err);
      })
    );
  }
}
