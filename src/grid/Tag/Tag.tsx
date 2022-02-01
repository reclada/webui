import React, { ReactChild, ReactElement, SVGProps, useCallback } from 'react';

import { ReactComponent as Close } from 'src/resources/close.svg';
import { classNames } from 'src/utils/classNames';

import styles from './Tag.module.scss';

interface Props {
  className?: string;
  children: ReactChild;
  closable?: boolean;
  closeIcon?: (props: SVGProps<SVGSVGElement>) => ReactElement | null;
  size?: 'l' | 'm';
  variant?: 'colored' | 'outlined';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  onClose?: () => void;
}

export const Tag = ({
  className,
  children,
  closable = false,
  closeIcon = Close,
  size = 'm',
  variant = 'colored',
  disabled = false,
  onClick,
  onClose,
}: Props): ReactElement => {
  const CloseIcon = closeIcon;

  const iconSize = size === 'm' ? 12 : 16;

  const handleClose = useCallback(
    event => {
      event.stopPropagation();

      onClose?.();
    },
    [onClose]
  );

  return (
    <span
      className={classNames(
        styles.tag,
        {
          [styles.large]: size === 'l',
          [styles.disabled]: disabled,
          [styles.primary]: variant === 'colored',
          [styles.outlined]: variant === 'outlined',
        },
        className
      )}
      onClick={onClick}
    >
      {children}

      {closable && <CloseIcon height={iconSize} width={iconSize} onClick={handleClose} />}
    </span>
  );
};
