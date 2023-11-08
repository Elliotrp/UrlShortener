import { NgModule } from '@angular/core';
import { EnterPasswordComponent } from './enter-password.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@NgModule({
   declarations: [EnterPasswordComponent],
   exports: [EnterPasswordComponent],
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatCardModule,
      MatProgressSpinnerModule
   ]
})
export class EnterPasswordModule { }
