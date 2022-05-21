import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SidebarLayoutComponent } from './sidebar-layout/sidebar-layout.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CategoriesModule } from '../categories/categories.module';
import { MaterialModule } from '../core/modules/material';
import { SearchbarModule } from './searchbar-layout/searchbar.module';

@NgModule({
  declarations: [AuthLayoutComponent, SidebarLayoutComponent, BaseLayoutComponent],
  imports: [CommonModule, RouterModule, MatSidenavModule, CategoriesModule, TranslateModule, MaterialModule, SearchbarModule]
})
export class LayoutsModule {}
