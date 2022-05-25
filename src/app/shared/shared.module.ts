import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [CommonModule, OverlayModule],
  exports: [LoadingComponent, OverlayModule],
  declarations: [LoadingComponent]
})
export class SharedModule {}
