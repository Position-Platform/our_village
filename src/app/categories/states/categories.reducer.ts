import { Action, createReducer, on } from '@ngrx/store';
import { Categorie, Commodite } from '../interfaces/categorie';
import { Datum } from '../interfaces/categories';
import {
  annulerFilter,
  annulerFilterSelected,
  categoriesFailure,
  categoriesSuccess,
  getallcategories,
  updateSuccess,
  updateviewcategorie,
  validerFilter
} from './categories.actions';

export const categorieFeatureKey = 'categorie';

export interface CategoriesState {
  categories: Datum[];
  result: any;
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
  isUpdate?: boolean;
  categorieSelect?: Categorie;
  isCategorie?: boolean;
  isFilterCategorie?: boolean;
  isSelectedFilter?: boolean;
  commodites?: Commodite[];
}

export const initialState: CategoriesState = {
  categories: [],
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false,
  isUpdate: false,
  categorieSelect: undefined,
  isCategorie: false,
  isFilterCategorie: false,
  isSelectedFilter: false,
  commodites: []
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
    result: '',
    isCategorie: true
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
    categorieSelect: categorie,
    isUpdate: true,
    isFilterCategorie: true
  })),
  on(annulerFilter, state => ({
    categories: state.categories,
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: false,
    result: '',
    categorieSelect: state.categorieSelect,
    isUpdate: true,
    isCategorie: true,
    isFilterCategorie: false
  })),
  on(validerFilter, (state, { commodites }) => ({
    categories: state.categories,
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: false,
    result: '',
    categorieSelect: state.categorieSelect,
    isUpdate: true,
    isCategorie: false,
    isFilterCategorie: false,
    isSelectedFilter: true,
    commodites: commodites
  })),
  on(annulerFilterSelected, state => ({
    categories: state.categories,
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: false,
    result: '',
    categorieSelect: state.categorieSelect,
    isUpdate: true,
    isCategorie: false,
    isFilterCategorie: true,
    isSelectedFilter: false
  }))
);

export function categoriesreducer(state: CategoriesState | undefined, action: Action): any {
  return categoriesReducer(state, action);
}
