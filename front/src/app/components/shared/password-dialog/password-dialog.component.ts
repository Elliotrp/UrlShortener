import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Url } from 'src/app/models/Url';
import { IPasswordDialogResult } from './password-dialog-result.interface';

@Component({
	selector: 'app-password-dialog',
	templateUrl: './password-dialog.component.html',
	styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent {
	public inputText: string | null = null;
	public showValidation: boolean = false;

	constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public url: Url) {}

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
