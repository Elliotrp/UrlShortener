import { Injectable } from '@angular/core';
import { DeviceDetectorService, BROWSERS, DeviceType } from 'ngx-device-detector';
import { IDeviceInfo } from 'src/app/interfaces/device-info.interface';

@Injectable({
    providedIn: 'root',
})
export class DeviceService {
   public deviceInfo: IDeviceInfo | undefined;

   constructor(private deviceDetector: DeviceDetectorService) {}

   public getDeviceInfo(): IDeviceInfo {
      this.deviceInfo = this.deviceInfo ? this.deviceInfo : {
         browser: browsers[this.deviceDetector.browser],
         operatingSystem: this.deviceDetector.os,
         deviceType: deviceTypes[this.deviceDetector.deviceType as DeviceType]
      };
      return this.deviceInfo
   }
}

const browsers: Record<string, string> = {
  [BROWSERS.CHROME]: 'Chrome',
  [BROWSERS.FIREFOX]: 'Firefox',
  [BROWSERS.SAFARI]: 'Safari',
  [BROWSERS.OPERA]: 'Opera',
  [BROWSERS.IE]: 'Internet Explorer',
  [BROWSERS.MS_EDGE]: 'Edge',
  [BROWSERS.MS_EDGE_CHROMIUM]: 'Edge Chromium',
  [BROWSERS.FB_MESSANGER]: 'Facebook Messenger',
  [BROWSERS.SAMSUNG]: 'Samsung',
  [BROWSERS.UCBROWSER]: 'UC Browser',
  [BROWSERS.UNKNOWN]: 'Unknown' 
}

const deviceTypes: Record<DeviceType, string> = {
   [DeviceType.Desktop]: 'Desktop',
   [DeviceType.Mobile]: 'Mobile',
   [DeviceType.Tablet]: 'Tablet',
   [DeviceType.Unknown]: 'Unknown'
 }
 