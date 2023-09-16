import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieComponent } from './pie.component';



@NgModule({
  declarations: [PieComponent],
  exports: [PieComponent],
  imports: [
    CommonModule
  ]
})
export class PieModule { }
