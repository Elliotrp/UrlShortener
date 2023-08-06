import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { UrlShortenerComponent } from './url-shortener.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlInfoListModule } from '../../shared/url-info-list/url-info-list.component.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
   declarations: [UrlShortenerComponent],
   exports: [UrlShortenerComponent],
   imports: [
      HttpClientModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      FormsModule,
      UrlInfoListModule,
      MatSnackBarModule,
   ]
})
export class UrlShortenerModule { }
