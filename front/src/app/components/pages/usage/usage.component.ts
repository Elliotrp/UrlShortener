import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUrl } from 'src/app/interfaces/url.interface';
import { IUsageResolverData } from './usage-resolver-data.interface';

@Component({
   selector: 'app-usage',
   templateUrl: './usage.component.html',
   styleUrls: ['./usage.component.scss']
})
export class UsageComponent {
   public url: IUrl;
   public links: IUsageTabs[] = usagePaths;
   public activeLink: string;
   public accessCount: number;

   constructor(
      router: Router,
      activatedRoute: ActivatedRoute
   ) {
      this.activeLink = this.links.find(l => router.url.includes(l.path))?.path ?? this.links[0].path;
      const resolverData: IUsageResolverData = activatedRoute.snapshot.data['resolverData'];
      this.url = resolverData.url;
      this.accessCount = resolverData.accessCount;
   }
}
interface IUsageTabs {
   name: string;
   path: string;
}

const usagePaths: IUsageTabs[] = [
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