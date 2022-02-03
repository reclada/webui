import React, { ReactElement, ReactNode } from 'react';

import { classNames } from 'src/utils/classNames';

import styles from './Menu.module.scss';
import { MenuProvider } from './MenuContext';
import { MenuDivider } from './MenuDivider';
import { MenuItem } from './MenuItem';

interface Props {
  className?: string;
  children: ReactNode | ReactNode[];
  selectedValues?: (string | number)[];
  onSelect?: (value?: number | string) => void;
}

export const Menu = ({
  children,
  className,
  selectedValues,
  onSelect,
}: Props): ReactElement => (
  <MenuProvider selectedValues={selectedValues} onSelect={onSelect}>
    <div className={classNames(styles.root, className)}>{children}</div>
  </MenuProvider>
);

Menu.Item = MenuItem;
Menu.Divider = MenuDivider;
