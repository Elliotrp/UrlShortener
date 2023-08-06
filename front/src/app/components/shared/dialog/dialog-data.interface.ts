import { IUrl } from "src/app/interfaces/url.interface";

export interface IDialogData {
   url: IUrl;
   remove: boolean;
   removeMessage: string;
}