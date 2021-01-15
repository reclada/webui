import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { classNames } from '../../utils/classNames';

import style from './Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    size?: 'm' | 'l';
    breed?: 'primary' | 'icon';
  }>;

export const Button: React.FC<ButtonProps> = React.memo(function Button({
  size,
  breed,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={classNames(className, {
        [style.root]: !breed || breed === 'primary',
        [style.icon]: breed === 'icon',
        [style.large]: size === 'l',
      })}
      {...props}
    >
      {children}
    </button>
  );
});
