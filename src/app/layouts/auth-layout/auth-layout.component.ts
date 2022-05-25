import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {
  environment: any;
  selectedSortOrder: string = environment.default_language;

  constructor(public translate: TranslateService) {
    this.environment = environment;
    translate.addLangs(environment.avaible_language);
  }

  //Evenement de changement de langue du géoportail
  change_language(lang: any) {
    if (lang['value']) {
      this.translate.use(lang['value']);
    }
    this.selectedSortOrder = lang;
  }
}
