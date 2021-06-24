import React, { FC } from 'react';

import style from './SearchResultSidebar.module.scss';

export type SideBarSubMenuProps = {
  name: string;
  position: number;
  items?: {
    name: string;
    icon: any;
    link: string;
    divider: boolean;
  }[];
};

export const SubSideMenu: FC<SideBarSubMenuProps> = function SubSideMenu({
  name,
  items,
  position,
}) {
  return (
    <div className={style.sidemenucontainter}>
      <div style={{ top: 127 + (position - 1) * 72, position: 'absolute', left: '84px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="32"
          viewBox="0 0 16 32"
          fill="none"
        >
          <path d="M0 16L16 0V32L0 16Z" fill="#536D85" />
        </svg>
      </div>
      <div className={style.sidemenuinnercontainter}>
        <div className={style.sidemenuheader}>{name}</div>
        {items?.map(item => {
          return (
            <div className={style.menuItemHeader}>
              {item.icon}
              <a href={item.link} className={style.sidebarlink}>
                {item.name}
              </a>
              {item.divider ? <div className={style.divider} /> : <></>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
