import { OrderOptions } from '../enums';

export interface IOrderOption {
  propertyName: string;
  option: 'ASC' | 'DESC';
}
