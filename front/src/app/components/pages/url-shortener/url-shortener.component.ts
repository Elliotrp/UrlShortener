import { Component, OnInit } from '@angular/core';
import { validateUrl } from 'src/app/functions/validate-url.function';
import { Url } from 'src/app/models/Url';
import { UrlService } from 'src/app/services/url/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { environment } from 'src/environment';

@Component({
   selector: 'app-url-shortener',
   templateUrl: './url-shortener.component.html',
   styleUrls: ['./url-shortener.component.scss'],
})
export class UrlShortenerComponent implements OnInit {
   public inputUrl: string | undefined;
   public shortenedUrls: Url[] = [];

   constructor(
      private readonly urlService: UrlService,
      private readonly snackBar: MatSnackBar,
      private readonly localStorageService: LocalStorageService
   ) { }

   public ngOnInit(): void {
      const storedUrls = this.localStorageService.getItem(
         environment.storageKeys.SHORTENED_URLS
      );
      if (storedUrls) {
         this.shortenedUrls = storedUrls;
      }
   }

   public shorten(): void {
      if (!validateUrl(this.inputUrl)) {
         this.snackBar.open('Please enter a valid url.', 'Dismiss', {
            duration: 3000,
         });
         return;
      }

      const requestBody: Url = { targetUrl: this.inputUrl };
      this.urlService.createUrl(requestBody).subscribe((response) => {
         if (response.body) {
            const url: Url = response.body;
            url.shortUrl = `${window.location.origin}/${url.shortUrl}`;
            this.shortenedUrls.push(url);
            this.localStorageService.setItem(
               environment.storageKeys.SHORTENED_URLS,
               this.shortenedUrls
            );
            this.inputUrl = undefined;
         }
      });
   }

   public removeUrl(url: Url): void {
      this.shortenedUrls = this.shortenedUrls.filter(
         (item) => item.id !== url.id
      );
      this.localStorageService.setItem(
         environment.storageKeys.SHORTENED_URLS,
         this.shortenedUrls
      );
   }

   public passwordSet(url: Url): void {
      const indexOfUrl = this.shortenedUrls.findIndex(
         (item) => item.id === url.id
      );
      this.shortenedUrls[indexOfUrl] = url;
      this.localStorageService.setItem(
         environment.storageKeys.SHORTENED_URLS,
         this.shortenedUrls
      );
   }
}
