import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCategories from './categories.reducer';

export const selectCategoriesState = createFeatureSelector<fromCategories.CategoriesState>(fromCategories.categorieFeatureKey);
export const selectCategories = createSelector(
  selectCategoriesState,

  (state: fromCategories.CategoriesState) => state.categories
);

export const selectIsLoading = createSelector(
  selectCategoriesState,

  (state: fromCategories.CategoriesState) => state.isLoading
);

export const selectIsUpdate = createSelector(
  selectCategoriesState,

  (state: fromCategories.CategoriesState) => state.isUpdate
);

export const selectIsFilterCategorie = createSelector(
  selectCategoriesState,

  (state: fromCategories.CategoriesState) => state.isFilterCategorie
);

export const selectIsCategorie = createSelector(
  selectCategoriesState,

  (state: fromCategories.CategoriesState) => state.isCategorie
);

export const selectCategorieClick = createSelector(
  selectCategoriesState,

  (state: fromCategories.CategoriesState) => state.categorieSelect
);

export const selectIsSelectedFilter = createSelector(
  selectCategoriesState,

  (state: fromCategories.CategoriesState) => state.isSelectedFilter
);

export const selectIsSelectedCommodite = createSelector(
  selectCategoriesState,

  (state: fromCategories.CategoriesState) => state.commodites
);
