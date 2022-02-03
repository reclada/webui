import { OrderType } from 'src/stores/Types';

import { IRecladaObject } from './IRecladaObject';

export interface ItemSettings {
  class: string;
  behavior: string;
  displayCSS: string;
}

export interface IColumn {
  width: number;
  caption: string;
  displayCSS?: string;
  behavior?: string;
  items?: ItemSettings;
}

export type IOrderColumn = string[];

export type IOrderRow = Record<keyof Required<IRecladaObject>, OrderType>[];
