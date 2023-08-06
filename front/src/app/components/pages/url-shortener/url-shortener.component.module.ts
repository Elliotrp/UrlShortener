import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { UrlShortenerComponent } from './url-shortener.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlInfoListComponentModule } from '../../shared/url-info-list/url-info-list.component.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
   declarations: [UrlShortenerComponent],
   exports: [UrlShortenerComponent],
   imports: [
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      FormsModule,
      UrlInfoListComponentModule,
      MatSnackBarModule,
   ],
   providers: [],
})
export class UrlShortenerModule { }
