import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlInfoListComponent } from './url-info-list.component';
import { MatCardModule } from '@angular/material/card';
import { UrlInfoModule } from '../url-info/url-info.module';

@NgModule({
   declarations: [UrlInfoListComponent],
   imports: [
      CommonModule,
      MatCardModule,
      UrlInfoModule
   ],
   exports: [
      UrlInfoListComponent
   ]
})
export class UrlInfoListModule { }
