import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { UrlShortener } from './url-shortener.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlInfoComponentModule } from '../../shared/url-info/url-info.component.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
   declarations: [
      UrlShortener,
   ],
   exports: [
      UrlShortener
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      FormsModule,
      UrlInfoComponentModule,
      MatSnackBarModule
   ],
   providers: [],
})
export class UrlShortenerModule { }