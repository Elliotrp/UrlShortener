import { IUrlAccessData } from "src/app/interfaces/url-access-data.interface";

export class UrlAccessDataMap extends Map<string, IUrlAccessData> {
   getItemById(id: string | number | undefined): IUrlAccessData | undefined {
      return id === undefined ? undefined : this.get(id.toString());
   }
}
