import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, Type, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';
import { AbstractChartTooltipComponent } from '../chart-tooltip/abstract-chart-tooltip.component';
import { createRandomAlphaString } from 'src/app/functions/create-random-alpha-string.function';
import { IUrlAccessData } from 'src/app/interfaces/url-access-data.interface';
import { ChartTooltipService } from 'src/app/services/chart-tooltip/chart-tooltip.service';
import { IChartTooltipData } from '../chart-tooltip/chart-tooltip-data.interface';

@Component({
   selector: 'app-pie',
   templateUrl: './pie.component.html',
   styleUrls: ['./pie.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class PieComponent implements AfterViewInit, OnChanges {
   @Input() public data: UrlAccessDataMap = new UrlAccessDataMap();
   @Input() public tooltipType: Type<AbstractChartTooltipComponent> | undefined;
   @Input() public title: string | undefined;
   @Input() public showPercentLabels = true;

   @ViewChild('pieContainer') container: ElementRef | undefined;
   @ViewChild('pieSvg', { read: ViewContainerRef }) svgElement: ViewContainerRef | undefined;

   public svgId: string = createRandomAlphaString(4);

   private svgg: d3.Selection<SVGGElement, any, HTMLElement, any> | undefined;
   private containerSize: number | undefined;
   private margin = 40;

   @HostListener('window:resize')
   private onResize(): void {
      if (this.containerSize !== Math.max(
         this.container?.nativeElement.offsetWidth,
         this.container?.nativeElement.offsetHeight)) {
         this.createChart();
      }
   }
   
   constructor(private readonly chartTooltipService: ChartTooltipService) { }

   public ngAfterViewInit(): void {
      this.createChart();
   }

   public ngOnChanges(): void {
      this.createChart();
   }

   public createChart(): void {
      this.containerSize = Math.max(
         this.container?.nativeElement.offsetWidth,
         this.container?.nativeElement.offsetHeight);
      if (!this.containerSize) {
         return;
      }

      if (this.svgg) {
         this.svgg.remove()
      }
      
      const radius = (this.containerSize - this.margin) / 2;

      // Get colour scale
      const colour: d3.ScaleSequential<string, never> = d3.scaleSequential(d3.interpolateBlues)
         .domain([this.data.size, 0]);
      
      this.svgg = d3.select<SVGGElement, any>('#'+ this.svgId)
         .attr('viewBox', `0 0 ${this.containerSize} ${this.containerSize}`)
         .append('g')
         .attr('transform', 'translate(' + this.containerSize / 2 + ',' + this.containerSize / 2 + ')');

      // Generate the pie
      var pie = d3.pie<[string, IUrlAccessData]>().value(d => d[1].relativeCount);

      // Generate the arcs
      var arc = d3.arc<d3.PieArcDatum<[string, IUrlAccessData]>>()
         .innerRadius(radius / 2)
         .outerRadius(radius)
         .padAngle(0.01)
         .cornerRadius(radius / 10);
      
      // Draw arcs
      var arcs = this.svgg
         .selectAll()
         .data(pie([...this.data]))
         .enter()
         .append('g')
         .attr('class', 'arc')
         .append('path')
         .attr('fill', (d: d3.PieArcDatum<[string, IUrlAccessData]>, i: number) => { return colour(i) })
         .attr('d', arc);

      // tooltip
      if (this.tooltipType) {
         this.svgg.selectAll('path')
            .on('mouseover', (event: MouseEvent, d: any) => {
               if (this.svgElement && this.tooltipType) {
                  const data: IChartTooltipData = {
                     label: d.data[0],
                     count: d.data[1].count.toString(),
                     relativeCount: Math.round(d.data[1].relativeCount).toString()
                  }
                  this.chartTooltipService.showTooltip(
                     data,
                     this.svgElement,
                     this.tooltipType,
                     event);
               }
            })
            .on('mousemove', (event: MouseEvent, d: any) => {
               this.chartTooltipService.updateTooltipPosition(event);
            })
            .on('mouseout', () => {
               this.chartTooltipService.hideTooltip();
            });      
      }
   }
}
