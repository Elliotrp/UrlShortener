import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { feature, mesh } from 'topojson-client';
import { WorldAtlas } from 'topojson';
import { ChoroplethDataMap } from './choropleth-data.class';
import { Feature } from 'geojson';

@Component({
  selector: 'app-choropleth',
  templateUrl: './choropleth.component.html',
  styleUrls: ['./choropleth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChoroplethComponent implements OnInit {
   @Input() public data: ChoroplethDataMap = new ChoroplethDataMap();

   private svg: d3.Selection<SVGElement, any, HTMLElement, any> | undefined;
   private path: d3.GeoPath | undefined;
   private colour: d3.ScaleThreshold<number, string>;

   constructor() {
      this.svg = d3.select("svg");
      this.colour = d3.scaleThreshold<number, string>().domain(d3.range(2, 10)).range(d3.schemeBlues[9]);
      d3.json<WorldAtlas>('/assets/countries-110m.json').then(this.create);
   }
   ngOnInit(): void {
      this.svg = d3.select("svg");
      this.colour = d3.scaleThreshold<number, string>().domain(d3.range(2, 10)).range(d3.schemeBlues[9]);
      d3.json<WorldAtlas>('/assets/countries-110m.json').then(this.create);
   }
   
   private create = (countries: WorldAtlas | undefined): void => {
      if (countries) {
         this.path = d3.geoPath(d3.geoMercator().fitWidth(800, mesh(countries, countries.objects.land)).translate([400, 250]));
         if (this.svg) {
            this.svg
               .append('g')
               .classed('countries', true)
               .selectAll('path')
               .data(feature(countries, countries.objects.countries).features)
               .enter()
               .append('path')
               .attr('fill', (d: Feature) => this.getFillColour(d))
               .attr('d', this.path)
               .classed('has-count', (d: Feature) => !!this.data.getItemById(d.id)?.count)
               .on('click', (d: PointerEvent, i: Feature) => this.showMessage(i))
               .on('mouseover', (d: MouseEvent, i: Feature) => this.mouseOver(d, i))
               .on('mouseleave', (d: MouseEvent, i: Feature) => this.mouseLeave(d, i));
         }
      }
   }

   private getFillColour(feature: Feature): string | null {
      const relativeCount = this.data.getItemById(feature.id)?.relativeCount;
      return relativeCount ? this.colour(relativeCount) : null;
   }

   private mouseOver = (d: MouseEvent, country: Feature): void => {
      if (this.data.getItemById(country.id)?.count) {
         d3.selectAll('path').classed('translucent', true)
         d3.select(d.target as HTMLElement)
            .classed('translucent', false)
            .classed('selected', true);
      }
   }

   private mouseLeave = (d: MouseEvent, country: Feature): void => {
      d3.selectAll('path').classed('translucent', false)
      d3.select(d.target as HTMLElement)
         .classed('selected', false)
   }
   
   private showMessage = (country: Feature): void => {
      const count = this.data.getItemById(country.id)?.count;
      if (count) {
         window.alert(country.properties?.['name'] + ' has ' + count + ' clicks.');
      }
   }

   //TODO
   // mock realistic data and adjust DONE
   // put in tab component
   // rename clicks to count and have relative count, keep this component generic
}
