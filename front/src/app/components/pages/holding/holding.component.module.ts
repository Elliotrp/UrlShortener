import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HoldingComponent } from './holding.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
	declarations: [
		HoldingComponent
   ],
   exports: [
		HoldingComponent
   ],
   imports: [
		CommonModule,
		MatProgressSpinnerModule,
      MatCardModule
	]
})
export class HoldingModule { }
