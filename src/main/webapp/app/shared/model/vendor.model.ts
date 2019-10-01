export interface IVendor {
  id?: number;
  company?: string;
  firstName?: string;
  lastName?: string;
  dot?: number;
  mc?: number;
  email?: string;
  phoneNumber?: number;
  insuranceProvider?: string;
}

export const defaultValue: Readonly<IVendor> = {};
