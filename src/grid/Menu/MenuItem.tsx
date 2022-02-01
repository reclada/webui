import React, { memo, ReactElement, useCallback, useMemo } from 'react';

import { BasicGridItem } from 'src/types/GridLayout';
import { classNames } from 'src/utils/classNames';

import { GridLayout } from '../GridLayout';

import styles from './Menu.module.scss';
import { useMenuContext } from './MenuContext';

interface Props {
  className?: string;
  value: string | number;
  onClick?: () => void;
  children: string | BasicGridItem | BasicGridItem[];
}

export const MenuItem = memo(
  ({ children, className, value, onClick }: Props): ReactElement => {
    const { selectedValues, onSelect } = useMenuContext();

    const selected = useMemo(() => !!selectedValues?.includes(value), [
      value,
      selectedValues,
    ]);

    const handleClick = useCallback(() => {
      onClick?.();
      onSelect?.(value);
    }, [value, onClick, onSelect]);

    const content = useMemo(() => {
      if (typeof children === 'string') {
        return children;
      }

      if (Array.isArray(children)) {
        return children.map((child, index) =>
          typeof child === 'string' ? child : <GridLayout key={index} layout={child} />
        );
      }

      return <GridLayout layout={children} />;
    }, [children]);

    return (
      <div
        className={classNames(styles.item, className, {
          [styles.selected]: selected,
        })}
        onClick={handleClick}
      >
        {content}
      </div>
    );
  }
);
