import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HoldingComponent } from './holding.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		HoldingComponent
 ],
 exports: [
		HoldingComponent
 ],
 imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		MatProgressSpinnerModule
	]
})
export class HoldingModule { }
