import { ICustomer } from 'app/shared/model/customer.model';
import { CountryEnum } from 'app/shared/model/enumerations/country-enum.model';

export interface ILocation {
  id?: number;
  address?: string;
  streetAddress?: string;
  city?: string;
  stateProvince?: string;
  country?: CountryEnum;
  postalCode?: string;
  customer?: ICustomer;
}

export const defaultValue: Readonly<ILocation> = {};
