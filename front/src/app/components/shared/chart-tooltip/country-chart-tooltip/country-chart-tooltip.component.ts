import { Component, OnInit } from '@angular/core';
import { AbstractChartTooltipComponent } from '../abstract-chart-tooltip.component';
import { CountryLookupService } from 'src/app/services/country-lookup/country-lookup.service';

@Component({
   templateUrl: './country-chart-tooltip.component.html',
   styleUrls: ['./country-chart-tooltip.component.scss']
})
export class CountryChartTooltipComponent extends AbstractChartTooltipComponent implements OnInit {
   public flagClass: string | undefined;

   constructor(private readonly countryLookupService: CountryLookupService) {
      super()
   }

   public ngOnInit(): void {
      if (this.data) {
         this.flagClass = `fi fi-${this.countryLookupService.byCountryName(this.data.label)?.alphaIso2.toLowerCase()}`;
      }
   }
}
