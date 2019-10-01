export interface IContainer {
  id?: number;
  company?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: number;
  insuranceProvider?: string;
}

export const defaultValue: Readonly<IContainer> = {};
