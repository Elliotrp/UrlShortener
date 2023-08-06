import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ErrorCode } from 'src/app/enums/error-code.enum';
import { IDeviceInfo } from 'src/app/interfaces/device-info.interface';
import { IGetUrlRequestQueryParams } from 'src/app/interfaces/get-url-request-query-params.interface';
import { ILocation } from 'src/app/interfaces/location.interface';
import { DeviceService } from 'src/app/services/device/device.service';
import { LocationService } from 'src/app/services/location/location.service';
import { UrlService } from 'src/app/services/url/url.service';

@Component({
   selector: 'app-enter-password',
   templateUrl: './enter-password.component.html',
   styleUrls: ['./enter-password.component.scss']
})
export class EnterPasswordComponent {
   public passwordControl = new FormControl('', [Validators.required, this.validatePassword.bind(this)]);
   public hidePassword: boolean = true;
   public isSubmitting: boolean = false;
   public invalidPassword: boolean = false;

   constructor(private readonly activatedRoute: ActivatedRoute,
      private readonly urlService: UrlService,
      private readonly locationService: LocationService,
      private readonly deviceService: DeviceService,
      private readonly router: Router) { }

   public submitPassword(): void {
      if (this.passwordControl.valid) {
         const password = this.passwordControl.value;
         const shortKey: string | null = this.activatedRoute.snapshot.paramMap.get('shortKey');
         if (shortKey && password) {
            this.isSubmitting = true;
            this.locationService.getLocation().pipe(
               switchMap((location: ILocation) => {
                  const deviceInfo: IDeviceInfo = this.deviceService.getDeviceInfo();
                  const queryParams: IGetUrlRequestQueryParams = {
                     password: password,
                     ...location,
                     ...deviceInfo,
                     dateTime: new Date().toLocaleString()
                  };
                  return this.urlService.getUrl(shortKey, queryParams);
               })
            ).subscribe((response) => {
               if (response.body?.targetUrl) {
                  this.router.navigate(['..'], { relativeTo: this.activatedRoute });
               } else if (response.body?.error.errorCode === ErrorCode.InvalidPassword) {
                  this.invalidPassword = true;
                  this.passwordControl.updateValueAndValidity();
               }
               this.isSubmitting = false;
            });
         }
      }
      
      this.passwordControl.markAsTouched();
   }

   public validatePassword(control: AbstractControl): ValidationErrors | null {
      const errors = this.invalidPassword ? { incorrectPassword: true } : null;
      this.invalidPassword = false; // reset validation
      return errors;
    }
}
