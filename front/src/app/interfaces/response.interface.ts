import { ErrorCode } from "../enums/error-code.enum";

export interface IResponse {
   error: {
      errorCode: ErrorCode;
      errorMessage: string;
   };
}