import React, { ReactElement, useMemo } from 'react';

import { BasicGridItem } from 'src/types/GridLayout';
import { classNames } from 'src/utils/classNames';

import { GridLayout } from '../GridLayout';

import styles from './Menu.module.scss';
import { MenuProvider } from './MenuContext';
import { MenuDivider } from './MenuDivider';
import { MenuItem } from './MenuItem';

interface Props {
  className?: string;
  children: string | BasicGridItem | BasicGridItem[];
  selectedValues?: (string | number)[];
  onSelect?: (value?: number | string) => void;
}

export const Menu = ({
  children,
  className,
  selectedValues,
  onSelect,
}: Props): ReactElement => {
  const content = useMemo(() => {
    if (typeof children === 'string') {
      return children;
    }

    if (Array.isArray(children)) {
      return children.map((child, index) => <GridLayout key={index} layout={child} />);
    }

    return <GridLayout layout={children} />;
  }, [children]);

  return (
    <MenuProvider selectedValues={selectedValues} onSelect={onSelect}>
      <div className={classNames(styles.root, className)}>{content}</div>
    </MenuProvider>
  );
};

Menu.Item = MenuItem;
Menu.Divider = MenuDivider;
