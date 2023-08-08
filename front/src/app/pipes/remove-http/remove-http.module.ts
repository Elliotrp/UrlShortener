import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveHttpPipe } from './remove-http.pipe';

@NgModule({
   declarations: [RemoveHttpPipe],
   exports: [RemoveHttpPipe],
   imports: [
      CommonModule
   ]
})
export class RemoveHttpModule { }
