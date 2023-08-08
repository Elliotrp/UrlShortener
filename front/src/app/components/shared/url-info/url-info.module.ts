import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlInfoComponent } from './url-info.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from 'ngx-clipboard';
import { DialogModule } from '../dialog/dialog.module';
import { RemoveHttpModule } from 'src/app/pipes/remove-http/remove-http.module';

@NgModule({
   declarations: [UrlInfoComponent],
   exports: [UrlInfoComponent],
   imports: [
      CommonModule,
      ClipboardModule,
      MatButtonModule,
      MatDialogModule,
      MatIconModule,
      MatSnackBarModule,
      MatTooltipModule,
      DialogModule,
      RemoveHttpModule
   ]
})
export class UrlInfoModule { }
