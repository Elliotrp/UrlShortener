import { Component, OnInit } from '@angular/core';
import { ChoroplethDataMap } from '../../shared/choropleth/choropleth-data.class';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
   public choroplethData: ChoroplethDataMap = new ChoroplethDataMap();
   
   public ngOnInit(): void {
      const testData = [{ id: '156', count: 10 }, { id: '840', count: 4}, { id: '826', count: 3}, { id: '032', count: 1}, { id: '180', count: 2}, { id: '124', count: 7}];
      testData.forEach((d: any) => {
         this.choroplethData.set(d.id, { count: 1, relativeCount: d.count })
      });
   }
}
