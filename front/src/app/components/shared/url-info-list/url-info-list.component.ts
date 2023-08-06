import { Component, Input } from '@angular/core';
import { IUrl } from 'src/app/interfaces/url.interface';
import { UrlLocalStorageService } from 'src/app/services/url-local-storage/url-local-storage.service';

@Component({
   selector: 'app-url-info-list',
   templateUrl: './url-info-list.component.html',
   styleUrls: ['./url-info-list.component.scss']
})
export class UrlInfoListComponent {
   @Input() public urls: IUrl[] = [];

   constructor(
      public readonly urlLocalStorageService: UrlLocalStorageService) { }
}
