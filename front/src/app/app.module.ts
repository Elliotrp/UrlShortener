import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UrlShortenerModule } from './components/pages/url-shortener/url-shortener.module';
import { HoldingModule } from './components/pages/holding/holding.module';
import { NotFoundModule } from './components/pages/not-found/not-found.module';
import { EnterPasswordModule } from './components/pages/enter-password/enter-password.module';
import { UsageModule } from './components/pages/usage/usage.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoadingRouterOutletModule } from './components/shared/loading-router-outlet/loading-router-outlet.module';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserAnimationsModule,
      BrowserModule,
      AppRoutingModule,
      UrlShortenerModule,
      HoldingModule,
      HttpClientModule,
      NotFoundModule,
      EnterPasswordModule,
      LoadingRouterOutletModule,
      UsageModule
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
