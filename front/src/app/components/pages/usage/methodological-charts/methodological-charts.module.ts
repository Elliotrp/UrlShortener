import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MethodologicalChartsComponent } from './methodological-charts.component';



@NgModule({
   exports: [MethodologicalChartsComponent],
   declarations: [MethodologicalChartsComponent],
   imports: [
      CommonModule
   ]
})
export class MethodologicalChartsModule { }
