import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarLayoutComponent } from './component/searchbar-layout.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule, SharedModule],
  exports: [SearchbarLayoutComponent],
  declarations: [SearchbarLayoutComponent]
})
export class SearchbarModule {}
