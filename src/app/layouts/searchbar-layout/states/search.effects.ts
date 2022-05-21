import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, distinctUntilChanged, exhaustMap, forkJoin, map, of, switchMap } from 'rxjs';
import { SearchService } from '../services/search.service';
import { searchFailure, searchQuery, searchSuccess } from './search.actions';
import { SearchInterface } from '../interfaces/search';
import * as searchAction from './search.actions';

@Injectable()
export class SearchEffects {
  results: SearchInterface[] = [];
  constructor(private actions$: Actions, private searchService: SearchService) {}

  searchQuery$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchAction.SEARCH_QUERY),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(({ query }) => {
        return forkJoin({
          etablissements: this.searchService.searchEtablissement(query),
          categories: this.searchService.searchCategories(query),
          nominatim: this.searchService.searchNominatim(query)
        }).pipe(
          map(({ etablissements, categories, nominatim }) => {
            return searchAction.searchSuccess({
              results: [...etablissements, ...categories, ...nominatim]
            });
          }),
          catchError(error => of(searchAction.searchFailure({ message: error })))
        );
      })
    );
  });
}
