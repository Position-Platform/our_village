import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { CategoriesService } from "../services/categories.service";
import * as categoriesAction from "./categories.actions";

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesAction.GETCATEGORIES),
      exhaustMap(() =>
        this.categoriesService.getAllCategories().pipe(
          map(categories => categoriesAction.categoriesSuccess({ categories })),
          catchError(error => of(categoriesAction.categoriesFailure({ message: error }))
          )
        )
      )
    )
  );

  updateViewCategorie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesAction.UPDATEVIEWCATEGORIE),
      exhaustMap(({ categorieId }) =>
        this.categoriesService.updateViewCategorie(categorieId).pipe(
          map(categorie => categoriesAction.updateSuccess({ categorie })),
          catchError(error => of(categoriesAction.updateFail({ message: error }))
          )
        )
      )
    )
  );
}
