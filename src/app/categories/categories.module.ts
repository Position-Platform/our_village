import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './components/categories/categories.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../core/modules/material';
import { FiltersComponent } from './components/filters/filters.component';
import { CommoditesButtonComponent } from './components/filters/commodites-button/commodites-button.component';
import { SelectedFiltersComponent } from './components/filters/selected-filters/selected-filters.component';

@NgModule({
  imports: [CommonModule, SharedModule, MaterialModule, TranslateModule],
  exports: [CategoriesComponent],
  declarations: [CategoriesComponent, FiltersComponent, CommoditesButtonComponent, SelectedFiltersComponent]
})
export class CategoriesModule {}
