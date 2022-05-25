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
import { environment } from 'src/environments/environment';
import { authFeatureKey, authreducer } from './core/auth/states/auth.reducer';
import { AuthEffects } from './core/auth/states/auth.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotifierModule } from 'angular-notifier';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

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
      defaultLanguage: environment.default_language,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,

    StoreModule.forFeature(searchFeatureKey, searchreducer),
    StoreModule.forFeature(categorieFeatureKey, categoriesreducer),
    StoreModule.forFeature(authFeatureKey, authreducer),
    StoreModule.forRoot({ searchreducer, categoriesreducer, authreducer }),
    EffectsModule.forRoot([SearchEffects, CategoriesEffects, AuthEffects]),
    FontAwesomeModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },

        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      }
    })
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('415511598213-s1gpbe2ch3bt1pv6p8jrd01m1nhj1fp6.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('551433395941902')
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
