import { MapModule } from './map/map.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { categorieFeatureKey, categoriesreducer } from './categories/states/categories.reducer';
import { CategoriesEffects } from './categories/states/categories.effects';
import { searchFeatureKey, searchreducer } from './layouts/searchbar-layout/states/search.reducer';
import { SearchEffects } from './layouts/searchbar-layout/states/search.effects';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new MultiTranslateHttpLoader(httpClient, [{ prefix: './assets/i18n/', suffix: '.json' }]);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MapModule,
    LayoutsModule,
    NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,

    StoreModule.forFeature(searchFeatureKey, searchreducer),
    StoreModule.forFeature(categorieFeatureKey, categoriesreducer),
    StoreModule.forRoot({ searchreducer, categoriesreducer }),
    EffectsModule.forRoot([SearchEffects, CategoriesEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
