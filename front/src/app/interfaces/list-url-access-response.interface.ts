import { IResponse } from "./response.interface";
import { IUrlAccess } from "./url-access.interface";

export interface IListUrlAccessResponse<T extends IUrlAccess> extends IResponse {
   urlAccesses: T[];
}