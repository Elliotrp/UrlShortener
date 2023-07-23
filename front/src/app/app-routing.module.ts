import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlShortenerComponent } from './components/pages/url-shortener/url-shortener.component';
import { ShortKeyGuard } from './guards/short-key.guard';
import { HoldingComponent } from './components/pages/holding/holding.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { EnterPasswordComponent } from './components/pages/enter-password/enter-password.component';
import { AnalyticsComponent } from './components/pages/analytics/analytics.component';

const routes: Routes = [
   {
      path: '',
      component: UrlShortenerComponent
   },
   {
      path: ':shortKey/not-found',
      title: 'Page Not Found',
      component: NotFoundComponent
   },
   {
      path: ':shortKey/enter-password',
      title: 'Enter Password',
      component: EnterPasswordComponent
   },
   {
      path: ':shortKey/usage',
      title: 'Url Usage',
      component: AnalyticsComponent
   },
   {
      path: ':shortKey',
      canActivate: [ShortKeyGuard],
      title: 'Redirecting...',
      component: HoldingComponent
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
