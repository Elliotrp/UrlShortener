import { Component } from '@angular/core';
import { AbstractLoadingRouterOutletComponent } from '../abstract-loading-router-outlet.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spinner-loading-router-outlet',
  templateUrl: './spinner-loading-router-outlet.component.html',
  styleUrls: ['./spinner-loading-router-outlet.component.scss']
})
export class SpinnerLoadingRouterOutletComponent extends AbstractLoadingRouterOutletComponent {
   constructor(router: Router) {
      super(router);
   }
}
