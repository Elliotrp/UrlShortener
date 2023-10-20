import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { IUrl } from 'src/app/interfaces/url.interface';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root'
})
export class UrlLocalStorageService {
   public shortenedUrls: IUrl[] = [];

   constructor(private readonly localStorageService: LocalStorageService) {
      this.initialise();
   }

   public getUrl(shortUrl: string): IUrl | undefined {
      return this.shortenedUrls.find(u => u.shortUrl?.endsWith(shortUrl));
   }

   public addUrl(url: IUrl): void {
      this.shortenedUrls.unshift(url);
      this.saveUrlsToLocalStorage();
   }

   public removeUrl(url: IUrl): void {
      this.shortenedUrls = this.shortenedUrls.filter(
         (item) => item.id !== url.id
      );
      this.saveUrlsToLocalStorage();
   }

   public replaceUrl(url: IUrl): void {
      const indexOfUrl = this.shortenedUrls.findIndex(
         (item) => item.id === url.id
      );
      this.shortenedUrls[indexOfUrl] = url;
      this.saveUrlsToLocalStorage();
   }

   private initialise(): void {
      const storedUrls = this.localStorageService.getItem(
         environment.storageKeys.SHORTENED_URLS
      );
      if (storedUrls) {
         this.shortenedUrls = storedUrls;
      }
   }

   private saveUrlsToLocalStorage(): void {
      this.localStorageService.setItem(
         environment.storageKeys.SHORTENED_URLS,
         this.shortenedUrls
      );
   }
}
