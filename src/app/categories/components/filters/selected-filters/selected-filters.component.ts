import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Commodite } from 'src/app/categories/interfaces/categorie';
import { ANNULERFILTERSELECTED } from 'src/app/categories/states/categories.actions';
import { CategoriesState } from 'src/app/categories/states/categories.reducer';
import { selectIsSelectedFilter } from 'src/app/categories/states/categories.selector';

@Component({
  selector: 'app-selected-filters',
  templateUrl: './selected-filters.component.html',
  styleUrls: ['./selected-filters.component.scss']
})
export class SelectedFiltersComponent {
  @Input() userFilterSelection?: Array<Commodite>;

  detectMobile = false;

  isSelectedFilter$: Observable<boolean | undefined>;

  constructor(private store: Store<CategoriesState>) {
    this.isSelectedFilter$ = this.store.pipe(select(selectIsSelectedFilter));
    if (window.innerWidth < 768) {
      this.detectMobile = true;
      console.log('mobile');
    } else {
      console.log('not mobile');
    }
  }

  openFilter() {
    // Empty the filter selection array
  }

  showHideFilterfunction() {
    this.store.dispatch({ type: ANNULERFILTERSELECTED });
  }
}
