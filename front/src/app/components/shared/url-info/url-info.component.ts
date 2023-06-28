import { Component, Input } from '@angular/core';
import { Url } from 'src/app/models/Url';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-url-info',
  templateUrl: './url-info.component.html',
  styleUrls: ['./url-info.component.scss']
})
export class UrlInfoComponent {
	@Input() public urls: Url[] = [];

  constructor(private readonly snackBar: MatSnackBar) { }

  public displayCopiedMessage(): void {
    this.snackBar.open('Copied!', '', {
      duration: 3000
     });
  }
}
