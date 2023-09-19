import { Component, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
   template: ''
})
export class AbstractLoadingRouterOutletComponent implements OnDestroy {
   public loading: boolean = false;

   private routerSubscription: Subscription;

   constructor(
      private readonly router: Router) {
      this.routerSubscription = this.router.events.subscribe((routerEvent: any) => {
         this.checkRouterEvent((routerEvent as RouterEvent));
      });
   }

   public ngOnDestroy(): void {
      this.routerSubscription.unsubscribe();
   }

   private checkRouterEvent(routerEvent: RouterEvent): void {
      if (routerEvent instanceof NavigationStart) {
         this.loading = true;
      }

      if (routerEvent instanceof NavigationEnd ||
         routerEvent instanceof NavigationCancel ||
         routerEvent instanceof NavigationError) {
         this.loading = false;
      }
   }
}
