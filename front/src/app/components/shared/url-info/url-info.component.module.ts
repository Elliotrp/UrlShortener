import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UrlInfoComponent } from './url-info.component';
import { ClipboardModule } from 'ngx-clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { PasswordDialogModule } from '../password-dialog/password-dialog.component.module';

@NgModule({
   declarations: [UrlInfoComponent],
   imports: [
      BrowserAnimationsModule,
      CommonModule,
      ClipboardModule,
      MatButtonModule,
      MatCardModule,
      MatDialogModule,
      MatIconModule,
      MatSnackBarModule,
      MatTooltipModule,
      PasswordDialogModule
   ],
   exports: [
      UrlInfoComponent
   ]
})
export class UrlInfoComponentModule { }
