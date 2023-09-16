import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MethodologicalChartsComponent } from './methodological-charts.component';
import { PieModule } from 'src/app/components/shared/pie/pie.module';

@NgModule({
   exports: [MethodologicalChartsComponent],
   declarations: [MethodologicalChartsComponent],
   imports: [
      CommonModule,
      PieModule
   ]
})
export class MethodologicalChartsModule { }
