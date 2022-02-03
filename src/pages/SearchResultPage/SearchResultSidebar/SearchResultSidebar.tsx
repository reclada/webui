import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';

import { GridLayout } from 'src/grid/GridLayout';
import { BasicGridItem, GridLayoutItem } from 'src/types/GridLayout';
import { eventEmitter } from 'src/utils/EventEmitter';
import { useOpen } from 'src/utils/useOpen';

import { classNames } from '../../../utils/classNames';

import style from './SearchResultSidebar.module.scss';
import { SidebarItem } from './SidebarItem/SidebarItem';
import { SubSideMenu } from './SubSideMenu';

type SearchResultSidebarProps = {
  className?: string;
  children: GridLayoutItem[];
  menu?: BasicGridItem[];
};

export const SearchResultSidebar: FC<SearchResultSidebarProps> = observer(
  function SearchResultSidebar({ className, children, menu }) {
    const { isOpen, toggle, close } = useOpen();

    useEffect(() => {
      const cb = () => toggle();

      eventEmitter.on('TOGGLE_SIDEBAR', cb);

      return () => eventEmitter.off('TOGGLE_SIDEBAR', cb);
    }, [toggle]);

    return (
      <div className={style.sidebarcontainer}>
        <div className={classNames(className, style.root)}>
          {children.map((child, index) => {
            return <SidebarItem key={index} icon={<GridLayout layout={child} />} />;
          })}
        </div>

        <SubSideMenu close={close} isOpen={isOpen} menu={menu} />
      </div>
    );
  }
);
