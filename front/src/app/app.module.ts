import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UrlShortenerModule } from './components/pages/url-shortener/url-shortener.component.module';
import { HoldingModule } from './components/pages/holding/holding.component.module';
import { NotFoundModule } from './components/pages/not-found/not-found.module';
import { EnterPasswordModule } from './components/pages/enter-password/enter-password.module';
import { AnalyticsModule } from './components/pages/analytics/analytics.module';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      UrlShortenerModule,
      HoldingModule,
      NotFoundModule,
      EnterPasswordModule,
      AnalyticsModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
