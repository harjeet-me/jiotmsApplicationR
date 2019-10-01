import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';

export interface IInsurance {
  id?: number;
  providerNumber?: string;
  provider?: string;
  description?: string;
  startDate?: Moment;
  expiryDate?: Moment;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IInsurance> = {};
