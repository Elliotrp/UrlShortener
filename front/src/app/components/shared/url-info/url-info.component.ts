import { Component, Input } from '@angular/core';
import { Url } from 'src/app/models/Url';

@Component({
  selector: 'app-url-info',
  templateUrl: './url-info.component.html',
  styleUrls: ['./url-info.component.scss']
})
export class UrlInfoComponent {
	@Input() public urls: Url[] = [];
}
