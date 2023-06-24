import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlShortener } from './components/pages/url-shortener/url-shortener.component';
import { ShortKeyGuard } from './guards/short-key.guard';

const routes: Routes = [
  {
    path: '',
    component: UrlShortener
  },
  {
    path: ':shortKey',
    canActivate: [ShortKeyGuard],
    component: UrlShortener
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
