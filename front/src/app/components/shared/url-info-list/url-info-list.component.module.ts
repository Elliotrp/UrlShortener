import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlInfoListComponent } from './url-info-list.component';
import { MatCardModule } from '@angular/material/card';
import { UrlInfoComponentModule } from '../url-info/url-info-component.module';

@NgModule({
   declarations: [UrlInfoListComponent],
   imports: [
      CommonModule,
      MatCardModule,
      UrlInfoComponentModule
   ],
   exports: [
      UrlInfoListComponent
   ]
})
export class UrlInfoListComponentModule { }
