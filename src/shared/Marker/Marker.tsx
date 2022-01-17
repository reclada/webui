import React, { HTMLAttributes, ReactElement, ReactNode } from 'react';

import { classNames } from 'src/utils/classNames';

import styles from './Marker.module.scss';

type Props = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  disabled?: boolean;
  error?: boolean;
};

export const Marker = ({
  children,
  className,
  disabled = false,
  error = false,
  ...props
}: Props): ReactElement => (
  <span
    className={classNames(
      styles.marker,
      { [styles.disabled]: disabled, [styles.error]: error },
      className
    )}
    {...props}
  >
    {children}
  </span>
);
