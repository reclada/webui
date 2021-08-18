export type OrderBy = {
  field: string;
  order: OrderType;
};

export enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum DisplayingTypes {
  LIST = 'list',
  CARD = 'card',
  TABLE = 'table',
}
