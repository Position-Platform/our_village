import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Categories, Datum } from '../interfaces/categories';
import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Categorie } from '../interfaces/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private apiService: ApiService) {}

  updateViewCategorie(id: number): Observable<Categorie> {
    return from(
      this.apiService.postRequest('/api/categories/' + id, {
        vues: true,
        _method: 'PUT'
      })
    ).pipe(
      map((categorie: Categorie) => {
        return categorie;
      }),
      catchError(err => {
        throw new Error(err);
      })
    );
  }

  getCategorieById(id: number): Observable<Categorie> {
    return from(this.apiService.getRequest('/api/categories/' + id)).pipe(
      map((categorie: Categorie) => {
        return categorie;
      }),
      catchError(err => {
        throw new Error(err);
      })
    );
  }

  getAllCategories(): Observable<Datum[]> {
    return from(this.apiService.getRequest('/api/categories')).pipe(
      map((categories: Categories) => {
        return categories.data;
      }),
      catchError(err => {
        throw new Error(err);
      })
    );
  }
}
