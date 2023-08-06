import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUrl } from 'src/app/interfaces/url.interface';
import { UrlLocalStorageService } from 'src/app/services/url-local-storage/url-local-storage.service';

@Component({
   selector: 'app-usage',
   templateUrl: './usage.component.html',
   styleUrls: ['./usage.component.scss']
})
export class UsageComponent {
   public url: IUrl | undefined;
   public links: IUsagePaths[] = usagePaths;
   public activeLink = this.links[0].path;

   constructor(private readonly urlLocalStorageService: UrlLocalStorageService,
      route: ActivatedRoute,
      router: Router) {
      const shortKey: string = route.snapshot.params['shortKey']
      this.url = this.urlLocalStorageService.getUrl(shortKey);
      console.log(this.url);
      if (!this.url) {
         router.navigate(['']);
      }
   }
}

interface IUsagePaths {
   name: string;
   path: string
}

const usagePaths: IUsagePaths[] = [
   {
      name: 'When',
      path: 'when'
   },
   {
      name: 'Where',
      path: 'where'
   },
   {
      name: 'How',
      path: 'how'
   }
];