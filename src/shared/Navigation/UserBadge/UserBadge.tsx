import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { authService } from 'src/services/authService';

import style from './UserBadge.module.scss';

export const UserBadge: FC = observer(function UserBadge() {
  const userName = authService.user.userName;
  const logout = useCallback(() => {
    authService.logout();
  }, []);
  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link className={style.menuItem} to="/files">
          Files
        </Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={style.root}>
      <div className={style.name}>{userName}</div>
      <Dropdown arrow overlay={userMenu} placement="bottomLeft">
        <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#0A93F5' }} />
      </Dropdown>
    </div>
  );
});
