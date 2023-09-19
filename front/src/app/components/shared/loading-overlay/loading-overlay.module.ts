import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingOverlayComponent } from './loading-overlay.component';

@NgModule({
   declarations: [LoadingOverlayComponent],
   exports: [LoadingOverlayComponent],
   imports: [
      CommonModule,
      MatProgressSpinnerModule
   ]
})
export class LoadingOverlayModule { }
