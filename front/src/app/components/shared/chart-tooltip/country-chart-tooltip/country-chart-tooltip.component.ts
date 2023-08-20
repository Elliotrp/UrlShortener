import { Component, OnInit } from '@angular/core';
import { AbstractChartTooltipComponent } from '../abstract-chart-tooltip.component';
import { byCountry } from 'country-code-lookup';

@Component({
   selector: 'app-country-chart-tooltip',
   templateUrl: './country-chart-tooltip.component.html',
   styleUrls: ['./country-chart-tooltip.component.scss']
})
export class CountryChartTooltipComponent extends AbstractChartTooltipComponent implements OnInit {
   public flagClass: string | undefined;

   public ngOnInit(): void {
      if (this.data) {
         this.flagClass = `fi fi-${byCountry(this.data.label)?.iso2.toLowerCase()}`;
      }
   }
}
