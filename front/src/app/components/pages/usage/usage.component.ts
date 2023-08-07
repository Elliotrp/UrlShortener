import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { IUrl } from 'src/app/interfaces/url.interface';
import { IUsageResolverData } from './usage-resolver-data.interface';

@Component({
   selector: 'app-usage',
   templateUrl: './usage.component.html',
   styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnInit {
   public url: IUrl | undefined;
   public links: IUsageTabs[] = usagePaths;
   public activeLink: string;
   public accessCount: number = 0;

   constructor(router: Router,
      private readonly activatedRoute: ActivatedRoute) {
      this.activeLink = this.links.find(l => router.url.includes(l.path))?.path ?? this.links[0].path;
   }

   public ngOnInit(): void {
      this.activatedRoute.data.pipe(map(({ resolverData }) => resolverData)).subscribe((resolverData: IUsageResolverData) => {
         this.url = resolverData.url;
         this.accessCount = resolverData.accessCount;
      });
   }
}

interface IUsageTabs {
   name: string;
   path: string
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