import { Moment } from 'moment';
import { IEquipment } from 'app/shared/model/equipment.model';
import { IDriver } from 'app/shared/model/driver.model';
import { IBooking } from 'app/shared/model/booking.model';
import { StatusEnum } from 'app/shared/model/enumerations/status-enum.model';

export interface IBookingItem {
  id?: number;
  description?: string;
  pickup?: Moment;
  drop?: Moment;
  source?: string;
  destination?: string;
  currentLocation?: string;
  status?: StatusEnum;
  detention?: number;
  chasisInTime?: Moment;
  podContentType?: string;
  pod?: any;
  hazmat?: boolean;
  recievedBy?: string;
  equipment?: IEquipment;
  driver?: IDriver;
  mainBooking?: IBooking;
}

export const defaultValue: Readonly<IBookingItem> = {
  hazmat: false
};
