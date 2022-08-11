import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Categorie } from '../../interfaces/categorie';
import { ANNULERFILTER } from '../../states/categories.actions';
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
  userFilterSelection?: Array<string> = [];
  userFilterSelectionId?: Array<number> = [];
  showHideFilter = false;
  value?: string;

  constructor(private store: Store<CategoriesState>) {}

  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      this.detectMobile = true;
    }
  }

  showHideFilterfunction() {
    // Empty the filter selection array
  }

  annuler() {
    this.store.dispatch({ type: ANNULERFILTER });
  }

  onValChange(_val: string) {
    // Empty the filter selection array
  }

  validerFilter() {
    // Empty the filter selection array
  }
}
