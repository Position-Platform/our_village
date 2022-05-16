import { createAction, props } from "@ngrx/store";
import { Categories, Datum } from "../interfaces/categories";

export const GETCATEGORIES = '[Categories List/API] Retrieve Categories';
export const SUCCESS = '[Categories List/API] Categories Success';
export const FAILURE = '[Categories List/API] Categories Failure';

/*export const getcategoriebyid = createAction(
  '[Categories List] Get Categeorie',
  props<{ categorieId: string }>()
);

export const updateviewcategorie = createAction(
  '[Categories List] Update view Categeorie',
  props<{ categorieId: string }>()
);*/

export const getallcategories = createAction(
  GETCATEGORIES,
  props<any>()
);


export const categoriesSuccess = createAction(
  SUCCESS,
  props<{ categories: Datum[] }>()
);

export const categoriesFailure = createAction(
  FAILURE,
  props<{ message: string }>()
);
