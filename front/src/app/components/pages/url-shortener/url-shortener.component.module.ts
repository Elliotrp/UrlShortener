import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UrlShortener } from './url-shortener.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
      ClipboardModule,
      BrowserAnimationsModule,
      MatCardModule,
      MatInputModule,
      MatButtonModule,
      FlexLayoutModule,
      FormsModule
   ],
   providers: [],
})
export class UrlShortenerModule { }