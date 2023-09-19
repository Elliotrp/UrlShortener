import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingOverlayModule } from '../loading-overlay/loading-overlay.module';
import { OverlayLoadingRouterOutletComponent } from './overlay-loading-router-outlet/overlay-loading-router-outlet.component';
import { SpinnerLoadingRouterOutletComponent } from './spinner-loading-router-outlet/spinner-loading-router-outlet.component';

@NgModule({
   declarations: [OverlayLoadingRouterOutletComponent, SpinnerLoadingRouterOutletComponent],
   exports: [OverlayLoadingRouterOutletComponent, SpinnerLoadingRouterOutletComponent],
   imports: [
      CommonModule,
      RouterModule,
      LoadingOverlayModule,
      MatProgressSpinnerModule
   ]
})
export class LoadingRouterOutletModule {
}
