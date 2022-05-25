import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './components/categories/categories.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../core/modules/material';

@NgModule({
  imports: [CommonModule, SharedModule, MaterialModule, TranslateModule],
  exports: [CategoriesComponent],
  declarations: [CategoriesComponent]
})
export class CategoriesModule {}
