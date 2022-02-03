import React, { ButtonHTMLAttributes, PropsWithChildren, memo } from 'react';

import { classNames } from '../../utils/classNames';
import { iconLibrary } from '../iconLibrary';

import style from './Button.module.scss';

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  clear = 'clear',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    size?: 'm' | 'l' | 's' | 'xs';
    breed?: 'primary' | 'icon';
    variant?: keyof typeof ButtonVariant;
    leftIcon?: keyof typeof iconLibrary;
    rightIcon?: keyof typeof iconLibrary;
  }>;

const iconSizesMap = {
  m: 16,
  l: 16,
  s: 16,
  xs: 12,
};

export const Button: React.FC<ButtonProps> = memo(
  ({
    size = 'm',
    variant = ButtonVariant.primary,
    breed,
    className,
    children,
    leftIcon,
    rightIcon,
    ...props
  }) => {
    const iconSize = iconSizesMap[size];
    const LeftIcon = leftIcon ? iconLibrary[leftIcon] : null;
    const RightIcon = rightIcon ? iconLibrary[rightIcon] : null;

    return (
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
        {LeftIcon && (
          <LeftIcon className={style.leftIcon} height={iconSize} width={iconSize} />
        )}

        {children}

        {RightIcon && (
          <RightIcon className={style.rightIcon} height={iconSize} width={iconSize} />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
