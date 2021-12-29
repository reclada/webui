import React, { ButtonHTMLAttributes, PropsWithChildren, memo } from 'react';

import { classNames } from '../../utils/classNames';

import style from './Button.module.scss';

enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  clear = 'clear',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    size?: 'm' | 'l' | 's' | 'xs';
    breed?: 'primary' | 'icon';
    variant?: keyof typeof ButtonVariant;
  }>;

export const Button: React.FC<ButtonProps> = memo(
  ({
    size = 'm',
    variant = ButtonVariant.primary,
    breed,
    className,
    children,
    ...props
  }) => (
    <button
      className={classNames(className, {
        [style.root]: !breed || breed === 'primary',
        [style.icon]: breed === 'icon',
        [style.large]: size === 'l',
        [style.small]: size === 's',
        [style.xs]: size === 'xs',
        [style.primary]: variant === ButtonVariant.primary,
        [style.secondary]: variant === ButtonVariant.secondary,
        [style.clear]: variant === ButtonVariant.clear,
      })}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';
