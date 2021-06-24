import React, { FC } from 'react';

import { classNames } from '../../../utils/classNames';

import style from './SearchResultSidebar.module.scss';

export type SideMenuItemProps = {
  onClick: () => void;
  icon: any;
  isActive?: boolean;
};

export const SideMenuItem: FC<SideMenuItemProps> = function SideMenuItem({
  onClick,
  icon,
  isActive,
}) {
  return (
    <div
      onClick={onClick}
      className={classNames(style.menuItem, isActive ? style.activeSvg : '')}
    >
      {icon}
    </div>
  );
};
