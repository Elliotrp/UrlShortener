import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUrl } from 'src/app/interfaces/url.interface';
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
   @Input() public urls: IUrl[] = [];
   @Output() public removeUrl: EventEmitter<IUrl> = new EventEmitter<IUrl>();
   @Output() public passwordSet: EventEmitter<IUrl> = new EventEmitter<IUrl>();

   constructor(private readonly snackBar: MatSnackBar,
      private readonly dialog: MatDialog,
      private readonly urlService: UrlService) { }

   public displayCopiedMessage(): void {
      this.snackBar.open('Copied!', '', {
         duration: 3000
      });
   }

   public remove(url: IUrl): void {
      this.removeUrl.emit(url);
   }

   public showPasswordDialog(url: IUrl): void {
      const dialogRef = this.dialog.open(PasswordDialogComponent, {
         width: '300px',
         data: url
      });

      dialogRef.afterClosed().subscribe((result: IPasswordDialogResult) => {
         if (result.submitted) {
            this.urlService.setUrlPassword(url, result.password).subscribe(
               response => {
                  url.password = !!result.password;
                  this.passwordSet.emit(url);
                  const message: string = url.password ? 'Password saved!' : 'Password removed!';
                  this.snackBar.open(message, '', {
                     duration: 3000
                  });
               }
            );
         }
      });
   }
}
