import { updateviewcategorie } from './../../states/categories.actions';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Datum } from '../../interfaces/categories';
import { GETCATEGORIES } from '../../states/categories.actions';
import { CategoriesState } from '../../states/categories.reducer';
import {
  selectCategorieClick,
  selectCategories,
  selectIsCategorie,
  selectIsFilterCategorie,
  selectIsLoading,
  selectIsSelectedCommodite,
  selectIsSelectedFilter,
  selectIsUpdate
} from '../../states/categories.selector';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Categorie, Commodite } from '../../interfaces/categorie';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Datum[]>;
  isLoading$: Observable<boolean>;
  isUpdate$: Observable<boolean | undefined>;
  isFilterCategorie$: Observable<boolean | undefined>;
  isCategorie$: Observable<boolean | undefined>;
  categorieSelect$: Observable<Categorie | undefined>;
  isSelectedFilter$: Observable<boolean | undefined>;
  commoditeSelected$: Observable<Commodite[] | undefined>;

  iconRegistry: MatIconRegistry | undefined;
  sanitzer: DomSanitizer | undefined;
  environment;

  show_hide_categorie = false;

  constructor(private store: Store<CategoriesState>, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.categories$ = this.store.pipe(select(selectCategories));
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.isUpdate$ = this.store.pipe(select(selectIsUpdate));
    this.isFilterCategorie$ = this.store.pipe(select(selectIsFilterCategorie));
    this.isCategorie$ = this.store.pipe(select(selectIsCategorie));
    this.categorieSelect$ = this.store.pipe(select(selectCategorieClick));
    this.isSelectedFilter$ = this.store.pipe(select(selectIsSelectedFilter));
    this.commoditeSelected$ = this.store.pipe(select(selectIsSelectedCommodite));

    this.iconRegistry = iconRegistry;
    this.sanitzer = sanitizer;
    this.environment = environment;
  }

  ShowHideCategorie() {
    if (!this.show_hide_categorie) {
      this.show_hide_categorie = true;
    } else {
      this.show_hide_categorie = false;
    }
  }

  ngOnInit() {
    this.store.dispatch({ type: GETCATEGORIES });

    this.categories$.subscribe(categories => {
      for (let index = 0; index < categories!.length; index++) {
        const categorie = categories![index];

        this.iconRegistry!.addSvgIcon(
          categorie.nom,
          this.sanitzer!.bypassSecurityTrustResourceUrl(environment.url_images + categorie.logourl)
        );
      }
    });
  }

  categorieClick(idcategorie: string) {
    this.store.dispatch(updateviewcategorie({ categorieId: idcategorie }));
  }
}
