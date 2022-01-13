import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Tile } from 'src/resources/card-view.svg';
import { ReactComponent as Global } from 'src/resources/global.svg';
import { ReactComponent as Search } from 'src/resources/search.svg';
import { useOpen } from 'src/utils/useOpen';

import { classNames } from '../../../utils/classNames';
import { routes } from '../../routes';

import { Menu2Content } from './Menu2Content';
import style from './SearchResultSidebar.module.scss';
import { SidebarItem } from './SidebarItem/SidebarItem';
import { SubSideMenu } from './SubSideMenu';

type SearchResultSidebarProps = {
  className: string;
};
export const SearchResultSidebar: FC<SearchResultSidebarProps> = observer(
  function SearchResultSidebar({ className }) {
    const { isOpen, toggle, close } = useOpen();
    // const isLogged = authService.user.isLogged;
    const history = useHistory();

    return (
      <div className={style.sidebarcontainer}>
        <div className={classNames(className, style.root)}>
          <div className={style.buttonscontainer}>
            <SidebarItem
              icon={<Search />}
              isActive={window.location.href.includes(routes.search)}
              onClick={() => history.push(routes.search)}
            />

            <SidebarItem
              icon={<Tile height={24} width={24} />}
              onClick={() => console.log('MenuItem2')}
            />

            <SidebarItem icon={<Global />} onClick={toggle} />
          </div>
        </div>

        <SubSideMenu close={close} isOpen={isOpen} items={Menu2Content.items} />
      </div>
    );
  }
);
