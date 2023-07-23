import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { WorldAtlas, mesh } from 'topojson';

@Component({
  selector: 'app-choropleth',
  templateUrl: './choropleth.component.html',
  styleUrls: ['./choropleth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChoroplethComponent implements OnInit {
   @Input() public data: Map<string, number> = new Map<string, number>();

   private svg: any;
   private path: any;
   private colour: any;

   ngOnInit(): void {
      this.svg = d3.select("svg");
      this.colour = d3.scaleThreshold<number, string>().domain(d3.range(2, 10)).range(d3.schemeBlues[9]);
      d3.json<WorldAtlas>('/assets/countries-110m.json').then(this.create);
   }
   
   private create = (countries: WorldAtlas | undefined): void => {
      if (countries) {
         this.path = d3.geoPath(d3.geoMercator().fitWidth(800, mesh(countries, countries.objects.land)).translate([400, 250]));
         this.svg
            .append("g")
            .attr('class', 'countries')
            .selectAll('path')
            .data(feature(countries, countries.objects.countries).features)
            .enter()
            .append('path')
            .attr('fill', (d: any) => this.colour((d.clicks = this.data.get(d.id))))
            .attr('d', this.path);
      }
   }
}
