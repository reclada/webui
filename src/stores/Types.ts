export interface IIdentifiable {
  GUID: string;
}

export type OrderBy = {
  field: string;
  order: OrderType;
};

export enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type RecladaOrder = {
  name: string;
  field: string;
  order: OrderType;
};

export enum DisplayingTypes {
  LIST = 'list',
  CARD = 'card',
  TABLE = 'table',
}

export type RFilter = {
  [key: string]: {
    operator: FiltersOperators;
    object: string | number;
  };
};

export type RecladaFilter = {
  key: string;
  name: string;
  operator: FiltersOperators;
  object: string | number;
};

export enum FiltersOperators {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  LIKE = 'LIKE',
}
