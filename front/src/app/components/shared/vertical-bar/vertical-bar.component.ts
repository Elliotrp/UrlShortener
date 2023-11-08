import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, Type, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';
import { IUrlAccessData } from 'src/app/interfaces/url-access-data.interface';
import { ChartTooltipService } from 'src/app/services/chart-tooltip/chart-tooltip.service';
import { AbstractChartTooltipComponent } from '../chart-tooltip/abstract-chart-tooltip.component';
import { IChartTooltipData } from '../chart-tooltip/chart-tooltip-data.interface';
import { createRandomAlphaString } from 'src/app/functions/create-random-alpha-string.function';

@Component({
   selector: 'app-vertical-bar',
   templateUrl: './vertical-bar.component.html',
   styleUrls: ['./vertical-bar.component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class VerticalBarComponent implements AfterViewInit, OnChanges {
   @Input() public data: UrlAccessDataMap = new UrlAccessDataMap();
   @Input() public tooltipType: Type<AbstractChartTooltipComponent> | undefined;
   @Input() public title: string | undefined;
   @Input() public tickFrequency: number | undefined;
   @Input() public showPercentLabels = true;

   @ViewChild('verticalBarContainer') container: ElementRef | undefined;
   @ViewChild('verticalBarSvg', { read: ViewContainerRef }) svgElement: ViewContainerRef | undefined;

   public svgId: string = createRandomAlphaString(4);

   private svgg: d3.Selection<SVGGElement, any, HTMLElement, any> | undefined;
   private containerWidth: number | undefined;
   private y: d3.ScaleLinear<number, number> | any;
   private margin = { top: 20, right: 60, bottom: 100, left: 60 };
   private width: number | undefined;
   private height = 250;

   @HostListener('window:resize')
   private onResize(): void {
      if (this.containerWidth !== this.container?.nativeElement.offsetWidth) {
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
      this.containerWidth = this.container?.nativeElement.offsetWidth;
      if (!this.containerWidth) {
         return;
      }

      this.width = this.containerWidth - this.margin.left - this.margin.right;

      if (this.svgg) {
         this.svgg.remove()
      }

      this.svgg = d3.select<SVGGElement, any>('#'+ this.svgId)
         .attr('viewBox', `0 0 ${this.width + this.margin.left + this.margin.right} ${this.height + this.margin.bottom}`)
         .append('g')
         .attr('transform',
            'translate(' + this.margin.left + ',' + this.margin.top + ')');

      // Add Y axis
      this.y = d3.scaleLinear()
         .domain([0, Math.max(...[...this.data].map((urlAccess) => (urlAccess[1].relativeCount)))])
         .range([this.height, 0]);

      // X axis
      var x = d3.scaleBand()
         .range([0, this.width])
         .domain([...this.data].map((urlAccess) => urlAccess[0]))
         .padding(.1);

      this.svgg.append('g')
         .attr('transform', 'translate(0,' + this.height + ')')
         .call(d3.axisBottom(x)
            .tickSizeOuter(0)
            .tickPadding(10)
            .tickFormat((interval, i) => {
               if (this.tickFrequency !== undefined) {
                  return i % this.tickFrequency !== 0 ? ' ' : interval;
               } else {
                  return interval;
               }
            }))
         .selectAll('text')
         .attr('transform', 'translate(-10,0)rotate(-45)')
         .style('text-anchor', 'end');

      //Bars
      this.svgg.append('g')
         .selectAll()
         .data(this.data)
         .join('rect')
         .classed('vertical-bar', true)
         .attr('y', (d) => this.y(d[1].relativeCount) + 5)
         .attr('x', (d) => { return x(d[0]) ?? 0 })
         .attr('height', (d) => this.getBarHeight(d, 5))
         .attr('width', x.bandwidth())

      this.svgg.append('g')
         .classed('round-bar', true)
         .selectAll()
         .data(this.data)
         .join('rect')
         .classed('vertical-bar', true)
         .attr('y', (d) => this.y(d[1].relativeCount) ?? 0)
         .attr('x', (d) => { return x(d[0]) ?? 0 })
         .attr('height', (d) => this.getBarHeight(d) ?? 0)
         .attr('width', x.bandwidth())

      // labels
      if (this.showPercentLabels) {
         this.svgg.append('g')
            .classed('data-label', true)
            .selectAll()
            .data(this.data)
            .join('text')
            .attr('y', (d) => this.y(d[1].relativeCount))
            .attr('x', (d) => (x(d[0]) ?? 0) + (x.bandwidth() / 2))
            .attr('dx', '0.35em')
            .attr('dy', -4)
            .text((d) => Math.round(d[1].relativeCount) + '%')
            .call((text) => text.filter(d => this.y(d[1].relativeCount) - this.y(0) < 25)
               .classed('outside-bar', true)
               .attr('dy', +4));
      }

      // tooltip
      if (this.tooltipType) {
         this.svgg.selectAll('rect')
            .on('mouseover', (event: MouseEvent, d: any) => {
               if (this.svgElement && this.tooltipType) {
                  const data: IChartTooltipData = {
                     label: d[0],
                     count: d[1].count.toString(),
                     relativeCount: Math.round(d[1].relativeCount).toString()
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

   private getBarHeight = (d: [string, IUrlAccessData], offset: number = 0): number => {
      const chartHeight: number = this.height ?? 0;
      const height = this.y(d[1].relativeCount) + offset;
      return height > chartHeight ? 0 : chartHeight - height;
   }
}
