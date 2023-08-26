import { DayOfWeek } from "../enums/day-of-week.enum";
import { IUrlAccess } from "./url-access.interface";

export interface IUrlAccessDay extends IUrlAccess {
   day: DayOfWeek
}