import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UrlInfoComponent } from './url-info.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [UrlInfoComponent],
  imports: [
    CommonModule,
    ClipboardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    UrlInfoComponent
  ]
})
export class UrlInfoComponentModule { }