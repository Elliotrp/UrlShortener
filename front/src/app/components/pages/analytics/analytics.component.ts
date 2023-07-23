import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
   public choroplethData: Map<string, number> = new Map<string, number>();
   
   public ngOnInit(): void {
      const testData = [{ id: '156', clicks: 10 }, { id: '840', clicks: 4}, { id: '826', clicks: 3}, { id: '032', clicks: 1}, { id: '180', clicks: 2}];
      testData.forEach(d => {
         this.choroplethData.set(d.id, d.clicks)
      });
   }
}
