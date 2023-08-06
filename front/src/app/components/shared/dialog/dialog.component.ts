import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPasswordDialogResult } from './dialog-result.interface';
import { IDialogData } from './dialog-data.interface';

@Component({
   templateUrl: './dialog.component.html'
})
export class DialogComponent {
   public inputText: string | null = null;
   public showValidation: boolean = false;

   constructor(public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: IDialogData
      ) { }

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
