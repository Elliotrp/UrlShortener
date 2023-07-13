import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { IDeviceInfo } from 'src/app/interfaces/device-info.interface';

@Injectable({
    providedIn: 'root',
})
export class DeviceService {
   public deviceInfo: IDeviceInfo | undefined;

   constructor(private deviceDetector: DeviceDetectorService) {}

   public getDeviceInfo(): IDeviceInfo {
      this.deviceInfo = this.deviceInfo ? this.deviceInfo : {
         browser: this.deviceDetector.browser,
         operatingSystem: this.deviceDetector.os,
         deviceType: this.deviceDetector.deviceType
      };
      return this.deviceInfo
   }
}
