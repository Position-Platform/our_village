import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { Categorie, Commodite } from '../../interfaces/categorie';
import { ANNULERFILTER, validerFilter } from '../../states/categories.actions';
import { CategoriesState } from '../../states/categories.reducer';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Input() categorie: Categorie | undefined;
  detectMobile = false;
  displayFilterSelection = false;
  userFilterSelection?: Array<Commodite> = [];
  showHideFilter = false;
  value?: string;
  private readonly notifier!: NotifierService;

  constructor(private store: Store<CategoriesState>, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      this.detectMobile = true;
    }
  }

  annuler() {
    this.store.dispatch({ type: ANNULERFILTER });
  }

  onValChange(_val: string) {
    // Empty the filter selection array
  }

  validerFilter() {
    if (this.userFilterSelection!.length > 0) {
      this.store.dispatch(validerFilter({ commodites: this.userFilterSelection! }));
    } else {
      this.notifier.notify('error', 'Aucune commodite selectionnée');
    }
  }

  addFilter(commodite: Commodite) {
    if (this.userFilterSelection?.includes(commodite)) {
      this.userFilterSelection.splice(this.userFilterSelection.indexOf(commodite), 1);
    } else {
      this.userFilterSelection?.push(commodite);
    }
  }
}
