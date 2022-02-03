import React, { FC } from 'react';

import { GridLayout } from 'src/grid/GridLayout';
import { BasicGridItem } from 'src/types/GridLayout';
import { classNames } from 'src/utils/classNames';

import style from './SearchResultSidebar.module.scss';

export type SideBarSubMenuProps = {
  isOpen: boolean;
  menu?: BasicGridItem[];
  close: () => void;
};

export const SubSideMenu: FC<SideBarSubMenuProps> = ({ isOpen, menu }) => (
  <div className={classNames(style.sidemenucontainter, { [style.openedMenu]: isOpen })}>
    {menu?.map((layout, index) => (
      <GridLayout key={index} layout={layout} />
    ))}
  </div>
);
