import { Injectable, ComponentRef, Type, ViewContainerRef } from '@angular/core';
import { AbstractChartTooltipComponent } from 'src/app/components/shared/chart-tooltip/abstract-chart-tooltip.component';
import { IChartTooltipData } from 'src/app/components/shared/chart-tooltip/chart-tooltip-data.interface';

@Injectable({
   providedIn: 'root'
})
export class ChartTooltipService {
   private tooltipRef: ComponentRef<AbstractChartTooltipComponent> | undefined;
   private viewContainerRef: ViewContainerRef | undefined;

   public showTooltip(
      data: IChartTooltipData,
      container: ViewContainerRef,
      tooltipType: Type<AbstractChartTooltipComponent>,
      mouseEvent: MouseEvent): void {
      if (this.tooltipRef) {
         this.hideTooltip();
      }

      this.viewContainerRef = container;
      this.tooltipRef = container.createComponent(tooltipType);
      this.tooltipRef.instance.data = data;
      this.updateTooltipPosition(mouseEvent);
   }

   public updateTooltipPosition(mouseEvent: MouseEvent): void {
      if (this.tooltipRef && mouseEvent) {
         const x = mouseEvent.offsetX + 10;
         const y = mouseEvent.offsetY + 5;
         this.tooltipRef.location.nativeElement.style.position = 'absolute';
         this.tooltipRef.location.nativeElement.style.left = `${x}px`;
         this.tooltipRef.location.nativeElement.style.top = `${y}px`;
      }
   }

   public hideTooltip(): void {
      if (this.tooltipRef && this.viewContainerRef) {
         this.viewContainerRef.clear();
         this.tooltipRef.destroy();
         this.tooltipRef = undefined;
      }
   }
}