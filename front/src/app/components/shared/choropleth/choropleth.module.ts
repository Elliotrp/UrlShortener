import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoroplethComponent } from './choropleth.component';

@NgModule({
   declarations: [ChoroplethComponent],
   exports: [ChoroplethComponent],
   imports: [
      CommonModule
   ]
})
export class ChoroplethModule { }
