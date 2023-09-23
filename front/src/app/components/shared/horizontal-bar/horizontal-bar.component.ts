import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, Type, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';
import { IUrlAccessData } from 'src/app/interfaces/url-access-data.interface';
import { ChartTooltipService } from 'src/app/services/chart-tooltip/chart-tooltip.service';
import { AbstractChartTooltipComponent } from '../chart-tooltip/abstract-chart-tooltip.component';
import { IChartTooltipData } from '../chart-tooltip/chart-tooltip-data.interface';
import { createRandomAlphaString } from 'src/app/functions/create-random-alpha-string.function';

@Component({
   selector: 'app-horizontal-bar',
   templateUrl: './horizontal-bar.component.html',
   styleUrls: ['./horizontal-bar.component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class HorizontalBarComponent implements AfterViewInit, OnChanges {
   @Input() public data: UrlAccessDataMap = new UrlAccessDataMap();
   @Input() public tooltipType: Type<AbstractChartTooltipComponent> | undefined;
   @Input() public title: string | undefined;
   @Input() public showPercentLabels = true;

   @ViewChild('horizontalBarContainer') container: ElementRef | undefined;
   @ViewChild('horizontalBarSvg', { read: ViewContainerRef }) svgElement: ViewContainerRef | undefined;
   
   public svgId: string = createRandomAlphaString(4);

   private svgg: d3.Selection<SVGGElement, any, HTMLElement, any> | undefined;
   private containerWidth: number | undefined;
   private x: d3.ScaleLinear<number, number> | any;
   private margin = { top: 20, right: 30, bottom: 40, left: 100 };
   private width: number | undefined;
   private height: number | undefined;

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
      this.height = [...this.data].length * 45;
      
      if (this.svgg) {
         this.svgg.remove()
      }

      this.svgg = d3.select<SVGGElement, any>('#'+ this.svgId)
         .attr('viewBox', `0 0 ${this.width + this.margin.left + this.margin.right} ${this.height + this.margin.bottom}`)
         .append('g')
         .attr('transform',
            'translate(' + this.margin.left + ',' + this.margin.top + ')');

      // Add X axis
      this.x = d3.scaleLinear()
         .domain([0, Math.max(...[...this.data].map((urlAccess) => (urlAccess[1].relativeCount)))])
         .range([0, this.width]);

      // Y axis
      var y = d3.scaleBand()
         .range([0, this.height])
         .domain([...this.data].map((urlAccess) => urlAccess[0]))
         .padding(.1);

      this.svgg.append('g')
         .call(d3.axisLeft(y)
            .tickSizeOuter(0)
            .tickSizeInner(0)
            .tickPadding(10));

      //Bars
      this.svgg.append('g')
         .selectAll()
         .data(this.data)
         .join('rect')
         .classed('horizontal-bar', true)
         .attr('x', this.x(0))
         .attr('y', (d) => { return y(d[0]) ?? 0 })
         .attr('width', (d) => this.getBarWidth(d, -5))
         .attr('height', y.bandwidth())

      this.svgg.append('g')
         .classed('round-bar', true)
         .selectAll()
         .data(this.data)
         .join('rect')
         .classed('horizontal-bar', true)
         .attr('x', this.x(0))
         .attr('y', (d) => { return y(d[0]) ?? 0 })
         .attr('width', (d) => this.getBarWidth(d))
         .attr('height', y.bandwidth())

      // labels
      if (this.showPercentLabels) {
         this.svgg.append('g')
            .classed('data-label', true)
            .selectAll()
            .data(this.data)
            .join('text')
            .attr('x', (d) => this.x(d[1].relativeCount))
            .attr('y', (d) => (y(d[0]) ?? 0) + (y.bandwidth() / 2))
            .attr('dy', '0.35em')
            .attr('dx', -4)
            .text((d) => Math.round(d[1].relativeCount) + '%')
            .call((text) => text.filter(d => this.x(d[1].relativeCount) - this.x(0) < 25)
               .classed('outside-bar', true)
               .attr('dx', +4));
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

   private getBarWidth = (d: [string, IUrlAccessData], offset: number = 0): number => {
      const width = this.x(d[1].relativeCount) + offset;
      return width < 0 ? 0 : width;
   }
}
