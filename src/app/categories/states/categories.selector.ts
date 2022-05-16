
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCategories from './categories.reducer';

export const selectCategoriesState = createFeatureSelector<fromCategories.CategoriesState>(

  fromCategories.categorieFeatureKey,

);
export const selectCategories = createSelector(

  selectCategoriesState,

  (state: fromCategories.CategoriesState) => state.categories,

);

export const selectIsLoading = createSelector(

  selectCategoriesState,

  (state: fromCategories.CategoriesState) => state.isLoading,
);
