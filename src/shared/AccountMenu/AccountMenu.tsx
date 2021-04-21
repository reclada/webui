import { Menu, Dropdown } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { classNames } from '../../utils/classNames';

import style from './AccountMenu.module.scss';

type AccountMenuProps = {
  className?: string;
};

export const AccountMenu: FC<AccountMenuProps> = function AccountMenu({ className }) {
  const menu = (
    <Menu className={style.menu}>
      <Menu.Item key="0">
        <Link className={style.menuItem} to="/files">
          Files
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <a>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement={'bottomRight'} trigger={['click']}>
      <div className={classNames(className, style.root)}>
        <div className={style.avatar} />
      </div>
    </Dropdown>
  );
};
