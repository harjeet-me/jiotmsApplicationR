import { Moment } from 'moment';
import { IBookingItem } from 'app/shared/model/booking-item.model';

export interface IDriver {
  id?: number;
  company?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: number;
  licenceNumber?: number;
  dob?: Moment;
  bookingItems?: IBookingItem[];
}

export const defaultValue: Readonly<IDriver> = {};
