import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef, Type, ComponentFactory, ElementRef } from '@angular/core';
import { AbstractChartTooltipComponent } from 'src/app/components/shared/chart-tooltip/abstract-chart-tooltip.component';
import { IChartTooltipData } from 'src/app/components/shared/chart-tooltip/chart-tooltip-data.interface';

@Injectable({
   providedIn: 'root'
})
export class ChartTooltipService {
   private tooltipRef: ComponentRef<AbstractChartTooltipComponent> | undefined;

   constructor(
      private resolver: ComponentFactoryResolver,
      private injector: Injector,
      private appRef: ApplicationRef
   ) { }

   public showTooltip(data: IChartTooltipData, container: ElementRef, tooltipType: Type<AbstractChartTooltipComponent>, x: number, y: number): void {
      if (this.tooltipRef) {
         this.hideTooltip();
      }

      const factory: ComponentFactory<AbstractChartTooltipComponent> = this.resolver.resolveComponentFactory(tooltipType);
      this.tooltipRef = factory.create(this.injector);
      this.tooltipRef.instance.data = data;
      this.appRef.attachView(this.tooltipRef.hostView);
      container.nativeElement.appendChild(this.tooltipRef.location.nativeElement);
      this.updateTooltipPosition(x, y);
   }

   public updateTooltipPosition(x: number, y: number): void {
      if (this.tooltipRef) {
         this.tooltipRef.location.nativeElement.style.position = 'absolute';
         this.tooltipRef.location.nativeElement.style.left = `${x}px`;
         this.tooltipRef.location.nativeElement.style.top = `${y}px`;
      }
   }

   public hideTooltip(): void {
      if (this.tooltipRef) {
         this.appRef.detachView(this.tooltipRef.hostView);
         this.tooltipRef.destroy();
         this.tooltipRef = undefined;
      }
   }
}