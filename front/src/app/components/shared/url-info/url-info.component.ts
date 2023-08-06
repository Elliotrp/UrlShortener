import { Component, Input } from '@angular/core';
import { IUrl } from 'src/app/interfaces/url.interface';
import { DialogComponent } from '../dialog/dialog.component';
import { IPasswordDialogResult } from '../dialog/dialog-result.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UrlService } from 'src/app/services/url/url.service';
import { UrlLocalStorageService } from 'src/app/services/url-local-storage/url-local-storage.service';

@Component({
  selector: 'app-url-info',
  templateUrl: './url-info.component.html',
  styleUrls: ['./url-info.component.scss']
})
export class UrlInfoComponent {
   @Input() public url: IUrl | undefined;
   @Input() public showActionButtons = false;

   constructor(
      public readonly urlLocalStorageService: UrlLocalStorageService,      
      private readonly snackBar: MatSnackBar,
      private readonly dialog: MatDialog,
      private readonly urlService: UrlService) { }

   public displayCopiedMessage(): void {
      this.snackBar.open('Copied!', '', {
         duration: 3000
      });
   }

   public remove(url: IUrl): void {
      const dialogRef = this.dialog.open(DialogComponent, {
         width: '300px',
         data: {
            url: url,
            remove: true,
            removeMessage: 'Remove link'
         }
      });

      dialogRef.afterClosed().subscribe((result: IPasswordDialogResult) => {
         if (result.submitted) {
            this.urlLocalStorageService.removeUrl(url);
         }
      });

   }

   public showPasswordDialog(url: IUrl): void {
      const dialogRef = this.dialog.open(DialogComponent, {
         width: '300px',
         data: {
            url: url,
            remove: url.password,
            removeMessage: 'Remove password'
         }
      });

      dialogRef.afterClosed().subscribe((result: IPasswordDialogResult) => {
         if (result.submitted) {
            this.urlService.setUrlPassword(url, result.password).subscribe(
               () => {
                  url.password = !!result.password;
                  this.urlLocalStorageService.replaceUrl(url);
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
