import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './components/categories/categories.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from './states/categories.effects';
import { categorieFeatureKey, reducer } from './states/categories.reducer';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../core/modules/material';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(categorieFeatureKey, reducer),
    StoreModule.forRoot(reducer),
    EffectsModule.forRoot([CategoriesEffects]),
    SharedModule,
    MaterialModule
  ],
  exports: [CategoriesComponent],
  declarations: [CategoriesComponent]
})
export class CategoriesModule {}
