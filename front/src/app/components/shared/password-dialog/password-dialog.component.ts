import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUrl } from 'src/app/interfaces/url.interface';
import { IPasswordDialogResult } from './password-dialog-result.interface';

@Component({
   selector: 'app-password-dialog',
   templateUrl: './password-dialog.component.html'
})
export class PasswordDialogComponent {
   public inputText: string | null = null;
   public showValidation: boolean = false;

   constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public url: IUrl) { }

   public cancel(): void {
      const result: IPasswordDialogResult = { submitted: false };
      this.dialogRef.close(result);
   }

   public set(): void {
      if (this.inputText) {
         this.submit();
      } else {
         this.showValidation = true;
      }
   }

   public remove(): void {
      this.inputText = null;
      this.submit();
   }

   private submit(): void {
      const result: IPasswordDialogResult = { submitted: true, password: this.inputText };
      this.dialogRef.close(result);
   }
}
