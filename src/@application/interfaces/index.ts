// export * from './baseError.interface';
export * from './option.interface';
export * from './orderOption.interface';
export * from './param.interface';
export * from './properties.interface';

export interface IMessageOnlyResponse {
  message: string;
  id?: any;
  ids?: any[];
}

export interface IGetAllFromDBResponse<T> {
  data: T[];
  total: number;
}
