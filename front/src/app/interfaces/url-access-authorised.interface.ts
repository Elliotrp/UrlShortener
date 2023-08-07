import { IUrlAccess } from "./url-access.interface";

export interface IUrlAccessAuthorised extends IUrlAccess {
   authorised: boolean;
}