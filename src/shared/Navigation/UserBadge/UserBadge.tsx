import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';

import { userService } from '../../../services/userService';

import style from './UserBadge.module.scss';

export const UserBadge: FC = observer(function UserBadge() {
  const userName = userService.user.userName;
  const logout = useCallback(() => {
    userService.logout();
  }, []);
  const userMenu = (
    <Menu>
      <Menu.Item onClick={logout}>Logout</Menu.Item>
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
