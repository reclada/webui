import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  memo,
  ReactElement,
  SVGProps,
} from 'react';

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
    leftIcon?: (props: SVGProps<SVGSVGElement>) => ReactElement | null;
    rightIcon?: (props: SVGProps<SVGSVGElement>) => ReactElement | null;
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
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    ...props
  }) => {
    const iconSize = iconSizesMap[size];

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
