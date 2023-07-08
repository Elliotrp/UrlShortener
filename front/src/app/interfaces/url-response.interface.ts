import { ErrorCode } from "../enums/error-code.enum";
import { IUrl } from "./url.interface";

export interface IUrlResponse extends IUrl {
   error: {
      errorCode: ErrorCode;
      errorMessage: string;
   };
}