import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
   selector: 'app-loading-overlay',
   template: '',
   styleUrls: ['./loading-overlay.component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class LoadingOverlayComponent {
   @Input() @HostBinding('class.blurred') loading = false;
}
