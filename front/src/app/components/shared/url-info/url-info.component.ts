import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Url } from 'src/app/models/Url';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { UrlService } from 'src/app/services/url/url.service';
import { IPasswordDialogResult } from '../password-dialog/password-dialog-result.interface';

@Component({
   selector: 'app-url-info',
   templateUrl: './url-info.component.html',
   styleUrls: ['./url-info.component.scss']
})
export class UrlInfoComponent {
   @Input() public urls: Url[] = [];
   @Output() public removeUrl: EventEmitter<Url> = new EventEmitter<Url>();
   @Output() public passwordSet: EventEmitter<Url> = new EventEmitter<Url>();

   constructor(private readonly snackBar: MatSnackBar,
      private readonly dialog: MatDialog,
      private readonly urlService: UrlService) { }

   public displayCopiedMessage(): void {
      this.snackBar.open('Copied!', '', {
         duration: 3000
      });
   }

   public remove(url: Url): void {
      this.removeUrl.emit(url);
   }

   public showPasswordDialog(url: Url): void {
      const dialogRef = this.dialog.open(PasswordDialogComponent, {
         width: '300px',
         data: url
      });

      dialogRef.afterClosed().subscribe((result: IPasswordDialogResult) => {
         if (result.submitted) {
            this.urlService.setUrlPassword(url, result.password).subscribe(
               response => {
                  if (response.ok) {
                     url.password = !!result.password;
                     this.passwordSet.emit(url);
                     const message: string = url.password ? 'Password saved!' : 'Password removed!';
                     this.snackBar.open(message, '', {
                        duration: 3000
                     });
                  }
               }
            );
         }
      });
   }
}
