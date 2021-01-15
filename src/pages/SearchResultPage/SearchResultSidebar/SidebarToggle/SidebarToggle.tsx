import React, { FC } from 'react';

import { ReactComponent as SidebarCloseIcon } from '../../../../resources/sidebar-close-icon.svg';
import { ReactComponent as SidebarOpenIcon } from '../../../../resources/sidebar-open-icon.svg';
import { classNames } from '../../../../utils/classNames';

import style from './SidebarToggle.module.scss';

type SidebarToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
};

export const SidebarToggle: FC<SidebarToggleProps> = function SidebarToggle({
  isOpen,
  onToggle,
  className,
}) {
  return (
    <button className={classNames(className, style.root)} onClick={onToggle}>
      {isOpen ? <SidebarCloseIcon /> : <SidebarOpenIcon />}
    </button>
  );
};
