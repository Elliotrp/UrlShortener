import { Component } from '@angular/core';
import { AbstractChartTooltipComponent } from '../abstract-chart-tooltip.component';

@Component({
  selector: 'app-day-chart-tooltip',
  templateUrl: './day-chart-tooltip.component.html',
  styleUrls: ['./day-chart-tooltip.component.scss']
})
export class DayChartTooltipComponent extends AbstractChartTooltipComponent { }
