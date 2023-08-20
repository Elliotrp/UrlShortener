import { Component, ElementRef, HostListener, Input, OnChanges, Type, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';
import { IUrlAccessData } from 'src/app/interfaces/url-access-data.interface';
import { ChartTooltipService } from 'src/app/services/chart-tooltip/chart-tooltip.service';
import { AbstractChartTooltipComponent } from '../chart-tooltip/abstract-chart-tooltip.component';
import { IChartTooltipData } from '../chart-tooltip/chart-tooltip-data.interface';

@Component({
   selector: 'app-horizontal-bar',
   templateUrl: './horizontal-bar.component.html',
   styleUrls: ['./horizontal-bar.component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class HorizontalBarComponent implements OnChanges {
   @Input() public data: UrlAccessDataMap = new UrlAccessDataMap();
   @Input() public tooltipType: Type<AbstractChartTooltipComponent> | undefined;
   @ViewChild('container') container: ElementRef | undefined;

   private svgg: d3.Selection<SVGGElement, any, HTMLElement, any> | undefined;
   private containerWidth: number | undefined;
   private x: d3.ScaleLinear<number, number> | any;
   private margin = { top: 20, right: 30, bottom: 40, left: 100 };
   private width: number = 700;
   private height: number = 400;


   @HostListener('window:resize')
   onResize() {
      if (this.containerWidth !== this.container?.nativeElement.offsetWidth) {
         this.ngOnChanges();
      }
   }

   constructor(
      private readonly chartTooltipService: ChartTooltipService
   ) { }

   public ngOnChanges(): void {
      this.containerWidth = this.container?.nativeElement.offsetWidth;
      // set the dimensions and margins of the graph
      this.width = (this.containerWidth ?? 700) - this.margin.left - this.margin.right;
      this.height = [...this.data].length * 45;

      if (this.svgg) {
         this.svgg.remove()
      }

      this.svgg = d3.select<SVGGElement, any>("#horizontalBar")
         .attr('viewBox', `0 0 ${this.width + this.margin.left + this.margin.right} ${this.height + this.margin.bottom}`)
         .append("g")
         .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");

      // Add X axis
      this.x = d3.scaleLinear()
         .domain([0, Math.max(...[...this.data].map((urlAccess) => (urlAccess[1].relativeCount)))])
         .range([0, this.width]);

      // Y axis
      var y = d3.scaleBand()
         .range([0, this.height])
         .domain([...this.data].map((urlAccess) => urlAccess[0]))
         .padding(.1);

      this.svgg.append("g")
         .call(d3.axisLeft(y).tickSizeOuter(0))

      //Bars
      this.svgg.append("g")
         .selectAll()
         .data(this.data)
         .join("rect")
         .attr("x", this.x(0))
         .attr("y", (d) => { return y(d[0]) ?? 0 })
         .attr("width", (d) => this.getBarWidth(d, -5))
         .attr("height", y.bandwidth())

      this.svgg.append("g")
         .classed('round-bar', true)
         .selectAll()
         .data(this.data)
         .join("rect")
         .attr("x", this.x(0))
         .attr("y", (d) => { return y(d[0]) ?? 0 })
         .attr("width", (d) => this.getBarWidth(d))
         .attr("height", y.bandwidth())

      // labels
      this.svgg.append('g')
         .classed('data-label', true)
         .selectAll()
         .data(this.data)
         .join("text")
         .attr("x", (d) => this.x(d[1].relativeCount))
         .attr("y", (d) => (y(d[0]) ?? 0) + (y.bandwidth() / 2))
         .attr("dy", "0.35em")
         .attr("dx", -4)
         .text((d) => Math.round(d[1].relativeCount) + '%')
         .call((text) => text.filter(d => this.x(d[1].relativeCount) - this.x(0) < 25)
            .classed('outside-bar', true)
            .attr("dx", +4));

      this.svgg.selectAll('rect')
         .on('mouseover', (event: MouseEvent, d: any) => {
            if (this.container && this.tooltipType) {
               const data: IChartTooltipData = {
                  label: d[0],
                  count: d[1].count,
                  relativeCount: Math.round(d[1].relativeCount).toString()
               }
               this.chartTooltipService.showTooltip(
                  data,
                  this.container,
                  this.tooltipType,
                  d3.pointer(event, this.container.nativeElement)[0] + 10,
                  d3.pointer(event, this.container.nativeElement)[1] + 5);
            }
         })
         .on('mousemove', (event: MouseEvent, d: any) => {
            if (this.container && this.tooltipType) {
               this.chartTooltipService.updateTooltipPosition(
                  d3.pointer(event, this.container.nativeElement)[0] + 10,
                  d3.pointer(event, this.container.nativeElement)[1] + 5);
            }
         })
         .on('mouseout', () => {
            this.chartTooltipService.hideTooltip();
         });
   }

   private getBarWidth = (d: [string, IUrlAccessData], offset: number = 0): number => {
      var width = this.x(d[1].relativeCount) + offset;
      return width < 0 ? 0 : width;
   }
}
