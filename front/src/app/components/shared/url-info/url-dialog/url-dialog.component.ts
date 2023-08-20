import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUrlDialogResult } from './url-dialog-result.interface';
import { IDialogData } from './url-dialog-data.interface';

@Component({
   templateUrl: './url-dialog.component.html'
})
export class UrlDialogComponent {
   public inputText: string | null = null;
   public showValidation: boolean = false;

   constructor(public dialogRef: MatDialogRef<UrlDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: IDialogData
   ) { }

   public cancel(): void {
      const result: IUrlDialogResult = { submitted: false };
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
      const result: IUrlDialogResult = { submitted: true, password: this.inputText };
      this.dialogRef.close(result);
   }
}
