import React, { FC, useCallback, useState } from 'react';

import { ReactComponent as MenuItem2 } from '../../../resources/1.svg';
import { ReactComponent as MenuItem3 } from '../../../resources/2.svg';
import { ReactComponent as MenuItem4 } from '../../../resources/3.svg';
import { ReactComponent as MenuItem5 } from '../../../resources/4.svg';
import { ReactComponent as MenuItem6 } from '../../../resources/5.svg';
import { ReactComponent as MenuItem7 } from '../../../resources/6.svg';
import { ReactComponent as JNJLogo } from '../../../resources/jnj.svg';
import { ReactComponent as SearchIcon } from '../../../resources/search.svg';
import { classNames } from '../../../utils/classNames';

import { Menu2Content } from './Menu2Content';
import style from './SearchResultSidebar.module.scss';
import { SubSideMenu } from './SubSideMenu';

type SearchResultSidebarProps = {
  className: string;
};
export const SearchResultSidebar: FC<SearchResultSidebarProps> = function SearchResultSidebar({
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => setIsOpen(val => !val), []);

  return (
    <div className={style.sidebarcontainer}>
      <div className={classNames(className, style.root)}>
        <div className={style.buttonscontainer}>
          <div className={style.jnjlogo}>
            <JNJLogo />
          </div>
          <div className={style.menuItem}>
            <SearchIcon />
          </div>
          <div className={style.menuItem}>
            <MenuItem2 />
          </div>
          <div className={style.menuItem} onClick={toggleOpen}>
            <MenuItem3 />
          </div>
          <div className={style.menuItem}>
            <MenuItem4 />
          </div>
          <div className={style.menuItem}>
            <MenuItem5 />
          </div>
          <div className={style.menuItem}>
            <MenuItem6 />
          </div>
          <div className={style.menuItem}>
            <MenuItem7 />
          </div>
        </div>
      </div>
      {isOpen ? (
        <SubSideMenu items={Menu2Content.items} name="Browser" position={3} />
      ) : (
        <></>
      )}
    </div>
  );
};
