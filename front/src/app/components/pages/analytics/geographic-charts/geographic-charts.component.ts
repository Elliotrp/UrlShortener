import { Component, OnInit } from '@angular/core';
import { ChoroplethDataMap } from '../../../shared/choropleth/choropleth-data.class';

@Component({
  selector: 'app-geographic-charts',
  templateUrl: './geographic-charts.component.html',
  styleUrls: ['./geographic-charts.component.scss']
})
export class GeographicChartsComponent implements OnInit {
   public choroplethData: ChoroplethDataMap = new ChoroplethDataMap();

   public ngOnInit(): void {
      const testData = [{ id: '156', count: 10 }, { id: 'GBR', count: 4}, { id: 'TZA', count: 3}, { id: 'AUS', count: 1}, { id: 'USA', count: 2}, { id: 'DEU', count: 7}];
      testData.forEach((d: any) => {
         this.choroplethData.set(d.id, { count: 1, relativeCount: d.count })
      });
   }
}
