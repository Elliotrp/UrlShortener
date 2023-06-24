import { Component } from '@angular/core';
import { Url } from 'src/app/models/Url';
import { UrlService } from 'src/app/services/url/url.service';

@Component({
	selector: 'app-url-shortener',
	templateUrl: './url-shortener.component.html',
	styleUrls: ['./url-shortener.component.scss']
})
export class UrlShortener {
	public url: string | undefined;
	public shortUrl: string | undefined;

	constructor(private readonly urlService: UrlService) {}

	shorten() {
		const requestBody: Url = { targetUrl: this.url };
		this.urlService.createUrl(requestBody).subscribe((response) => {
			this.shortUrl = `${window.location.origin}/${response.shortUrl}`;
		});
		
		// store result in session storage and display in a table component
		// use external api to get 5 letter words so that it is memorable
	}
}
