import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlInfoComponent } from './url-info.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';
import { DialogComponentModule } from '../dialog/dialog.component.module';

@NgModule({
  declarations: [UrlInfoComponent],
  exports: [UrlInfoComponent],
  imports: [
   BrowserAnimationsModule,
    CommonModule,
    ClipboardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    DialogComponentModule,
  ]
})
export class UrlInfoComponentModule { }
