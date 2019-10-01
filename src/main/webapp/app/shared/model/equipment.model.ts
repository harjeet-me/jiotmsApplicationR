import { EquipmentEnum } from 'app/shared/model/enumerations/equipment-enum.model';
import { SizeEnum } from 'app/shared/model/enumerations/size-enum.model';

export interface IEquipment {
  id?: number;
  number?: string;
  type?: EquipmentEnum;
  size?: SizeEnum;
  insurance?: string;
}

export const defaultValue: Readonly<IEquipment> = {};
