import { IOrderOption } from ".";

export interface IOptions {
  searchTerm?: string;
  relations?: string[];
  selects?: string[];
  order?: IOrderOption;
  take?: number | 'all';
  page?: number;
  skip?: number;
  fetchAll?: boolean;
  single?: boolean;
  ids?: string[];
  between?: string[];
  before?: Date;
  after?: Date;
  startDate?: Date;
  endDate?: Date;
  sort?: string;
}
