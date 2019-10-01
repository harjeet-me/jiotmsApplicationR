import { StatusEnum } from 'app/shared/model/enumerations/status-enum.model';

export interface IInvoiceItem {
  id?: number;
  name?: string;
  status?: StatusEnum;
  shipmentNumber?: string;
  bol?: string;
}

export const defaultValue: Readonly<IInvoiceItem> = {};
