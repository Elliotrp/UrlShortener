import { Component } from '@angular/core';
import { AbstractLoadingRouterOutletComponent } from '../abstract-loading-router-outlet.component';
import { Router } from '@angular/router';

@Component({
   selector: 'app-overlay-loading-router-outlet',
   templateUrl: './overlay-loading-router-outlet.component.html',
   styleUrls: ['./overlay-loading-router-outlet.component.scss'],
})
export class OverlayLoadingRouterOutletComponent extends AbstractLoadingRouterOutletComponent {
   constructor(router: Router) {
      super(router);
   }
}
