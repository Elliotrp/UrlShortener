import { Component } from '@angular/core';
import { validateUrl } from 'src/app/functions/validate-url.function';
import { Url } from 'src/app/models/Url';
import { UrlService } from 'src/app/services/url/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-url-shortener',
	templateUrl: './url-shortener.component.html',
	styleUrls: ['./url-shortener.component.scss']
})
export class UrlShortener {
	public inputUrl: string | undefined;
	public shortenedUrls: Url[] = [];

	constructor(private readonly urlService: UrlService,
		private readonly snackBar: MatSnackBar) { }

	public shorten(): void {
		if (!validateUrl(this.inputUrl)) {
			this.snackBar.open('Please enter a valid url.', 'Close', {
				duration: 3000
			 });
			 return;
		}

		const requestBody: Url = { targetUrl: this.inputUrl };
		this.urlService.createUrl(requestBody).subscribe((response) => {
			this.shortenedUrls.push(new Url(response.id, `${window.location.origin}/${response.shortUrl}`, this.inputUrl));
			this.inputUrl = undefined;
		});
		
		// store result in session storage and display in a table component
		// use external api to get 5 letter words so that it is memorable
	}
}
