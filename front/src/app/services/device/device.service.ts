import { Injectable } from '@angular/core';
import { DeviceDetectorService, BROWSERS } from 'ngx-device-detector';
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
         deviceType: this.deviceDetector.deviceType
      };
      return this.deviceInfo
   }
}

const browsers: Record<string, string> = {
  'Chrome': BROWSERS.CHROME,
  'Firefox': BROWSERS.FIREFOX,
  'Safari': BROWSERS.SAFARI,
  'Opera': BROWSERS.OPERA,
  'Internet Explorer': BROWSERS.IE,
  'Edge': BROWSERS.MS_EDGE,
  'Edge Chromium': BROWSERS.MS_EDGE_CHROMIUM,
  'Facebook Messenger': BROWSERS.FB_MESSANGER,
  'Samsung': BROWSERS.SAMSUNG,
  'UC Browser': BROWSERS.UCBROWSER,
  'Unknown': BROWSERS.UNKNOWN
}
