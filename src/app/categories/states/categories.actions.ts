import { createAction, props } from '@ngrx/store';
import { Categorie } from '../interfaces/categorie';
import { Datum } from '../interfaces/categories';

export const GETCATEGORIES = '[Categories List/API] Retrieve Categories';
export const SUCCESS = '[Categories List/API] Categories Success';
export const FAILURE = '[Categories List/API] Categories Failure';

export const UPDATEVIEWCATEGORIE = '[Categories List/API] Update View Categorie';
export const UPDATESUCCESS = '[Categories List/API] Update Success';
export const UPDATEFAIL = '[Categories List/API] Update Fail';

export const ANNULERFILTER = '[Categories List/API] Annuler Filter';

/*export const getcategoriebyid = createAction(
  '[Categories List] Get Categeorie',
  props<{ categorieId: string }>()
);*/

// Action Update View Categorie
export const updateviewcategorie = createAction(UPDATEVIEWCATEGORIE, props<{ categorieId: string }>());

export const updateSuccess = createAction(UPDATESUCCESS, props<{ categorie: Categorie }>());

export const updateFail = createAction(UPDATEFAIL, props<{ message: string }>());

// Action Get All Categorie
export const getallcategories = createAction(GETCATEGORIES, props<any>());

export const categoriesSuccess = createAction(SUCCESS, props<{ categories: Datum[] }>());

export const categoriesFailure = createAction(FAILURE, props<{ message: string }>());

export const annulerFilter = createAction(ANNULERFILTER);
