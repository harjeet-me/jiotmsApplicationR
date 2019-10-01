import { ICustomer } from 'app/shared/model/customer.model';
import { DesignationEnum } from 'app/shared/model/enumerations/designation-enum.model';

export interface IContact {
  id?: number;
  designation?: DesignationEnum;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: number;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IContact> = {};
