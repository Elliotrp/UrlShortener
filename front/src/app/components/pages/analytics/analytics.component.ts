import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
   links = ['When', 'Where', 'How'];
   activeLink = this.links[0];
}
