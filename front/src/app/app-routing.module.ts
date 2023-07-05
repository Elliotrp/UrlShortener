import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlShortenerComponent } from './components/pages/url-shortener/url-shortener.component';
import { ShortKeyGuard } from './guards/short-key.guard';
import { HoldingComponent } from './components/pages/holding/holding/holding.component';

const routes: Routes = [
   {
      path: '',
      component: UrlShortenerComponent
   },
   {
      path: ':shortKey',
      canActivate: [ShortKeyGuard],
      component: HoldingComponent
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
