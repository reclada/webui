import React, {
  memo,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';

import { classNames } from 'src/utils/classNames';

import styles from './Menu.module.scss';
import { useMenuContext } from './MenuContext';

interface Props {
  className?: string;
  value: string | number;
  onClick?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const MenuItem = memo<PropsWithChildren<Props>>(
  ({ children, className, value, onClick, leftIcon, rightIcon }): ReactElement => {
    const { selectedValues, onSelect } = useMenuContext();

    const selected = useMemo(() => !!selectedValues?.includes(value), [
      value,
      selectedValues,
    ]);

    const handleClick = useCallback(() => {
      onClick?.();
      onSelect?.(value);
    }, [value, onClick, onSelect]);

    return (
      <div
        className={classNames(styles.item, className, {
          [styles.selected]: selected,
        })}
        onClick={handleClick}
      >
        {leftIcon}

        {children}

        {rightIcon}
      </div>
    );
  }
);
