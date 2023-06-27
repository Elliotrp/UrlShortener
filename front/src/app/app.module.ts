import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UrlShortenerModule } from './components/pages/url-shortener/url-shortener.component.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UrlShortenerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
