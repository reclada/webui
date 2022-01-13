import { Tabs } from 'antd';
import React, { FC, ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ReactComponent as ArrowLeft } from 'src/resources/arrow-left.svg';
import { ReactComponent as TeamIcon } from 'src/resources/team.svg';
import { Button } from 'src/shared/Button/Button';
import { User } from 'src/shared/User/User';
import { classNames } from 'src/utils/classNames';

import style from './SearchResultSidebar.module.scss';

export type SideBarSubMenuProps = {
  isOpen: boolean;
  items?: {
    title: string;
    icon: ReactNode;
    items: {
      route: string;
      label: string;
    }[];
  }[];
  close: () => void;
};

const users = [
  {
    name: 'Makarov A.',
    avatar: '/images/avatar.png',
  },
  {
    name: 'Petrov V.',
    avatar: '/images/avatar.png',
  },
  {
    name: 'Sidorov E.',
    avatar: '/images/avatar.png',
  },
];

const Rail = () => <div className={style.rail} />;

export const SubSideMenu: FC<SideBarSubMenuProps> = function SubSideMenu({
  isOpen,
  items,
  close,
}) {
  const { pathname } = useLocation();

  return (
    <div className={classNames(style.sidemenucontainter, { [style.openedMenu]: isOpen })}>
      <Button className={style.closeSideMenuButton} rightIcon={ArrowLeft} onClick={close}>
        Close
      </Button>

      {items?.map(({ title, icon, items }) => {
        return (
          <div key={title} className={style.menuSection}>
            <div className={style.menuSectionHeader}>
              {icon} {title}
            </div>

            <Tabs
              activeKey={pathname}
              className={style.tabs}
              tabBarExtraContent={<Rail />}
              tabBarGutter={12}
              tabPosition="right"
            >
              {items.map(({ route, label }) => {
                const active = route === pathname;

                return (
                  <Tabs.TabPane
                    key={route}
                    className={style.tab}
                    tab={
                      <NavLink
                        className={classNames(
                          style.sidebarlink,
                          active ? style.active : ''
                        )}
                        to={route}
                      >
                        {label}
                      </NavLink>
                    }
                  />
                );
              })}
            </Tabs>
          </div>
        );
      })}

      <div className={style.menuSection}>
        <div className={style.menuSectionHeader}>
          <TeamIcon height={16} width={16} /> Who can see
        </div>

        <div className={style.menuSectionBody}>
          {users.map(user => (
            <User key={user.name} className={style.user} {...user} />
          ))}

          <Rail />
        </div>
      </div>
    </div>
  );
};
