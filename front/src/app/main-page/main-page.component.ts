import { Component } from '@angular/core';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
	public url: string | undefined;
	public shortUrl: string | undefined;

	constructor() {}

	shorten() {
		console.log('shorten');
		this.shortUrl = this.url;
		// this.http.post<any>('https://api-ssl.bitly.com/v4/shorten', {
		// long_url: this.url
		// }, {
		// headers: {
		// 	Authorization: 'Bearer <YOUR_ACCESS_TOKEN>',
		// 	'Content-Type': 'application/json'
		// }
		// }).subscribe(response => {
		// 	this.shortUrl = response.link;
		// });

		// store result in session storage and display in a table component
		// use external api to get 5 letter words so that it is memorable
	}
}
