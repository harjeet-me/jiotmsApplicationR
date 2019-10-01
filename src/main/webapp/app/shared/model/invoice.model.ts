import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';
import { StatusEnum } from 'app/shared/model/enumerations/status-enum.model';

export interface IInvoice {
  id?: number;
  bookingNo?: string;
  invoiceTotal?: number;
  invoiceDueDate?: Moment;
  status?: StatusEnum;
  invoiceTo?: ICustomer;
}

export const defaultValue: Readonly<IInvoice> = {};
