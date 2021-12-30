import { Value } from 'src/api/IRecladaObject';

export type CellRendererProps<T extends Value> = {
  value: T;
  onClick?: (value: T) => void;
};
