import { updateviewcategorie } from './../../states/categories.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Datum } from '../../interfaces/categories';
import { GETCATEGORIES } from '../../states/categories.actions';
import { CategoriesState } from '../../states/categories.reducer';
import { selectCategories, selectIsLoading, selectIsUpdate } from '../../states/categories.selector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Datum[]>;
  isLoading$: Observable<boolean>;
  isUpdate$: Observable<boolean | undefined>;

  constructor(private store: Store<CategoriesState>) {
    this.categories$ = this.store.pipe(select(selectCategories));
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.isUpdate$ = this.store.pipe(select(selectIsUpdate));
  }

  ngOnInit() {
    this.store.dispatch({ type: GETCATEGORIES });
  }

  categorieClick(idcategorie: string) {
    this.store.dispatch(updateviewcategorie({ categorieId: idcategorie }));
  }

}
