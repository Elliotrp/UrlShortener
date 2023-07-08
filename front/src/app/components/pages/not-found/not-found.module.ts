import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './not-found.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
   declarations: [NotFoundComponent],
   exports: [NotFoundComponent],
   imports: [
      CommonModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule
   ]
})
export class NotFoundModule { }
