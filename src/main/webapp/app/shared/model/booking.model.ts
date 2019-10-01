import { IBookingItem } from 'app/shared/model/booking-item.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { StatusEnum } from 'app/shared/model/enumerations/status-enum.model';

export interface IBooking {
  id?: number;
  name?: string;
  loadNuber?: string;
  shipmentNumber?: string;
  bol?: string;
  status?: StatusEnum;
  bookingItems?: IBookingItem[];
  customer?: ICustomer;
}

export const defaultValue: Readonly<IBooking> = {};
