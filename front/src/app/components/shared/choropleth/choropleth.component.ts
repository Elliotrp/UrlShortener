import { Component, ElementRef, Input, OnChanges, Type, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { feature, mesh } from 'topojson-client';
import { WorldAtlas } from 'topojson';
import { UrlAccessDataMap } from '../../../classes/url-access-data-map.class';
import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { ChartTooltipService } from 'src/app/services/chart-tooltip/chart-tooltip.service';
import { AbstractChartTooltipComponent } from '../chart-tooltip/abstract-chart-tooltip.component';
import { IUrlAccessData } from 'src/app/interfaces/url-access-data.interface';
import { byIso } from 'country-code-lookup';
import { IChartTooltipData } from '../chart-tooltip/chart-tooltip-data.interface';

@Component({
   selector: 'app-choropleth',
   templateUrl: './choropleth.component.html',
   styleUrls: ['./choropleth.component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class ChoroplethComponent implements OnChanges {
   @Input() public data: UrlAccessDataMap = new UrlAccessDataMap();
   @Input() public tooltipType: Type<AbstractChartTooltipComponent> | undefined;
   @ViewChild('container') container: ElementRef | undefined;

   private svg: d3.Selection<SVGElement, any, HTMLElement, any> | undefined;
   private path: d3.GeoPath | undefined;
   private colour: d3.ScaleSequential<string, never>;

   constructor(private readonly chartTooltipService: ChartTooltipService) {
      this.colour = d3.scaleSequential(d3.interpolateBlues).domain([0, 100]);
   }

   public ngOnChanges(): void {
      this.svg = d3.select("svg");
      d3.json<WorldAtlas>('/assets/countries-110m.json').then(this.create);
   }

   private create = (countries: WorldAtlas | undefined): void => {
      if (countries) {
         this.path = d3.geoPath(d3.geoMercator().fitWidth(800, mesh(countries, countries.objects.land)).translate([400, 250]));
         if (this.svg) {
            this.svg
               .append('g')
               .classed('countries', true)
               .selectAll<SVGGElement, Feature<Geometry, GeoJsonProperties>>('path')
               .data<Feature<Geometry, GeoJsonProperties>>(feature<GeoJsonProperties>(countries, countries.objects.countries).features)
               .enter()
               .append('path')
               .attr('fill', this.getFillColour)
               .attr('d', this.path)
               .classed('has-count', this.hasCount)

            this.svg.selectAll('.has-count')
               .on('mouseover', (event: MouseEvent, d: any) => {
                  const country: Feature = d as Feature;
                  const urlAccess: IUrlAccessData | undefined = this.data.getItemById(country.id);
                  if (country.id && urlAccess && this.container && this.tooltipType) {
                     const countryName: string | undefined = byIso(country.id)?.country;
                     if (countryName) {
                        const data: IChartTooltipData = {
                           label: countryName,
                           count: urlAccess.count.toString(),
                           relativeCount: Math.round(urlAccess.relativeCount).toString()
                        }
                        this.chartTooltipService.showTooltip(
                           data,
                           this.container,
                           this.tooltipType,
                           d3.pointer(event, this.container.nativeElement)[0] + 10,
                           d3.pointer(event, this.container.nativeElement)[1] + 5);
                     }
                  }
               })
               .on('mousemove', (event: MouseEvent, d: any) => {
                  if (this.container && this.tooltipType) {
                     this.chartTooltipService.updateTooltipPosition(
                        d3.pointer(event, this.container.nativeElement)[0] + 10,
                        d3.pointer(event, this.container.nativeElement)[1] + 5);
                  }
               })
               .on('mouseout', () => {
                  this.chartTooltipService.hideTooltip();
               });

         }
      }
   }

   private getFillColour = (country: Feature): string | null => {
      const relativeCount = this.data.getItemById(country.id)?.relativeCount;
      return relativeCount ? this.colour(relativeCount) : null;
   }

   // private showMessage = (country: Feature): void => {
   //    const count = this.data.getItemById(country.id)?.count;
   //    // if (count) {
   //       window.alert(country.properties?.['name'] + ' has ' + count + ' clicks.');
   //    // }
   // }

   private hasCount = (country: Feature): boolean => {
      return !!this.data.getItemById(country.id)?.count
   }
}
