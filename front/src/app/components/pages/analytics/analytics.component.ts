import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
   public choroplethData: Map<string, number> = new Map<string, number>();
   
   public ngOnInit(): void {
      const testData = [{ id: '156', clicks: 10 }, { id: '840', clicks: 5}, { id: '826', clicks: 7}];
      testData.forEach(d => {
         this.choroplethData.set(d.id, d.clicks)
      });
   }
}
