import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlShortener } from './components/pages/url-shortener/url-shortener.component';

const routes: Routes = [
  {
    path: '',
    component: UrlShortener
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
