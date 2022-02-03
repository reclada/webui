import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as MenuItem2 } from '../../../resources/1.svg';
import { ReactComponent as MenuItem3 } from '../../../resources/2.svg';
import { ReactComponent as MenuItem4 } from '../../../resources/3.svg';
import { ReactComponent as MenuItem5 } from '../../../resources/4.svg';
import { ReactComponent as MenuItem6 } from '../../../resources/5.svg';
import { ReactComponent as MenuItem7 } from '../../../resources/6.svg';
import { ReactComponent as Logo } from '../../../resources/logotype.svg';
import { ReactComponent as SearchIcon } from '../../../resources/search.svg';
import { authService } from '../../../services/authService';
import { Navigation } from '../../../shared/Navigation/Navigation';
import { classNames } from '../../../utils/classNames';
import { routes } from '../../routes';

import { Menu2Content } from './Menu2Content';
import style from './SearchResultSidebar.module.scss';
import { SideMenuItem } from './SideMenuItem';
import { SubSideMenu } from './SubSideMenu';

type SearchResultSidebarProps = {
  className: string;
};
export const SearchResultSidebar: FC<SearchResultSidebarProps> = observer(
  function SearchResultSidebar({ className }) {
    const [isOpen, setIsOpen] = useState(false);
    const isLogged = authService.user.isLogged;
    const history = useHistory();

    const toggleOpen = useCallback(() => setIsOpen(val => !val), []);

    return (
      <div className={style.sidebarcontainer}>
        <div className={classNames(className, style.root)}>
          <div className={style.buttonscontainer}>
            <div className={style.jnjlogo}>
              <Logo />
            </div>
            <SideMenuItem
              icon={<SearchIcon />}
              isActive={window.location.href.includes(routes.search)}
              onClick={() => history.push(routes.search)}
            />
            {isLogged && (
              <SideMenuItem
                icon={<MenuItem2 />}
                onClick={() => console.log('MenuItem2')}
              />
            )}
            {isLogged && <SideMenuItem icon={<MenuItem3 />} onClick={toggleOpen} />}
            {isLogged && (
              <SideMenuItem
                icon={<MenuItem4 />}
                onClick={() => console.log('MenuItem4')}
              />
            )}
            {isLogged && (
              <SideMenuItem
                icon={<MenuItem5 />}
                onClick={() => console.log('MenuItem5')}
              />
            )}
            {isLogged && (
              <SideMenuItem
                icon={<MenuItem6 />}
                onClick={() => console.log('MenuItem6')}
              />
            )}
            {isLogged && (
              <SideMenuItem
                icon={<MenuItem7 />}
                onClick={() => console.log('MenuItem7')}
              />
            )}
            <Navigation />
          </div>
        </div>
        {isOpen ? (
          <SubSideMenu items={Menu2Content.items} name="Browser" position={3} />
        ) : (
          <></>
        )}
      </div>
    );
  }
);
