import { Injectable } from '@angular/core';
import { ICountry } from './interfaces/country.interface';
import { countries } from './countries.const';

@Injectable({
  providedIn: 'root'
})
export class CountryLookupService {
   public byAlpha3Iso(alphaIso: string): ICountry | undefined {
      return countries.find((country: ICountry) => country.alphaIso3 === alphaIso);
   }

   public byCountryName(countryName: string): ICountry | undefined {
      return countries.find((country: ICountry) => country.countryName === countryName);
   }
}
