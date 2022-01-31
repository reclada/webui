import { ComponentProps } from 'react';

import { BaseComponentsMap } from 'src/grid/components-map';

export interface GridEvent {
  name: string;
  type: 'click' | 'dbclick' | 'change';
  value: any;
}

export type BasicGridItem = {
  component: string;
  props?: any;
  children?: any;
  event?: GridEvent;
};

export type InferGridItemType<
  Repository extends Record<string, React.ComponentType<any>>
> = {
  [Name in keyof Repository]: {
    component: Name;
    event?: GridEvent;
  } & {
    props: Omit<ComponentProps<Repository[Name]>, 'children'>;
    children: ComponentProps<Repository[Name]>['children'];
  };
}[keyof Repository];

export type GridLayoutItem = InferGridItemType<typeof BaseComponentsMap>;
