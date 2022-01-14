import React, { ButtonHTMLAttributes, ReactElement } from 'react';

import { classNames } from 'src/utils/classNames';

import { ButtonVariant } from '../Button/Button';

import styles from './IconButton.module.scss';

type Props = ButtonHTMLAttributes<HTMLDivElement> & {
  size?: 'm' | 'l' | 's' | 'xs';
  variant?: keyof typeof ButtonVariant;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  disabled?: boolean;
};

const iconSizesMap = {
  l: 24,
  m: 24,
  s: 20,
  xs: 16,
};

export const IconButton = ({
  className,
  size = 'm',
  variant = ButtonVariant.primary,
  icon: Icon,
  disabled = false,
  ...props
}: Props): ReactElement => {
  const iconSize = iconSizesMap[size];

  return (
    <div
      className={classNames(
        styles.root,
        {
          [styles.primary]: variant === ButtonVariant.primary,
          [styles.secondary]: variant === ButtonVariant.secondary,
          [styles.disabled]: disabled,
          [styles.xs]: size === 'xs',
          [styles.s]: size === 's',
          [styles.m]: size === 'm',
          [styles.l]: size === 'l',
        },
        className
      )}
      {...props}
    >
      <Icon height={iconSize} width={iconSize} />
    </div>
  );
};
