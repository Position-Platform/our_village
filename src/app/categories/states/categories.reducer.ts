import { Action, createReducer, on } from '@ngrx/store';
import { Datum } from '../interfaces/categories';
import { categoriesFailure, categoriesSuccess, getallcategories, updateSuccess, updateviewcategorie } from './categories.actions';

export const categorieFeatureKey = 'categorie';

export interface CategoriesState {
  categories: Datum[];
  result: any;
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
  isUpdate?: boolean;
  categorie?: Datum;
}

export const initialState: CategoriesState = {
  categories: [],
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false,
  isUpdate: false
};

export const categoriesReducer = createReducer(
  initialState,
  on(getallcategories, state => ({
    categories: state.categories,
    isLoading: true,
    isLoadingSuccess: false,
    isLoadingFailure: false,
    result: ''
  })),
  on(categoriesSuccess, (state, { categories }) => ({
    categories: categories,
    isLoading: false,
    isLoadingSuccess: true,
    isLoadingFailure: false,
    result: ''
  })),
  on(categoriesFailure, (state, { message }) => ({
    categories: [],
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: true,
    result: ''
  })),
  on(updateviewcategorie, (state, { categorieId }) => ({
    categories: state.categories,
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: false,
    result: '',
    isUpdate: false
  })),
  on(updateSuccess, (state, { categorie }) => ({
    categories: state.categories,
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: false,
    result: '',
    categorie: categorie,
    isUpdate: true
  }))
);

export function categoriesreducer(state: CategoriesState | undefined, action: Action): any {
  return categoriesReducer(state, action);
}
