import { Component } from '@angular/core';
import { validateUrl } from 'src/app/functions/validate-url.function';
import { IUrl } from 'src/app/interfaces/url.interface';
import { UrlService } from 'src/app/services/url/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UrlLocalStorageService } from 'src/app/services/url-local-storage/url-local-storage.service';

@Component({
   selector: 'app-url-shortener',
   templateUrl: './url-shortener.component.html',
   styleUrls: ['./url-shortener.component.scss'],
})
export class UrlShortenerComponent {
   public inputUrl: string | undefined;

   constructor(
      public readonly urlLocalStorageService: UrlLocalStorageService,
      private readonly urlService: UrlService,
      private readonly snackBar: MatSnackBar,
   ) { }

   public shorten(): void {
      if (!validateUrl(this.inputUrl)) {
         this.snackBar.open('Please enter a valid url.', 'Dismiss', {
            duration: 3000,
         });
         return;
      }

      if (this.inputUrl) {
         this.urlService.createUrl(this.inputUrl).subscribe((response) => {
            if (response.body) {
               const url: IUrl = response.body;
               url.shortUrl = `${window.location.origin}/${url.shortUrl}`;
               this.urlLocalStorageService.addUrl(url);
               this.inputUrl = undefined;
            }
         });
      }
   }
}
