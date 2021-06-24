import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';

import { authService } from 'src/services/authService';

import style from './UserBadge.module.scss';

export const UserBadge: FC = observer(function UserBadge() {
  const logout = useCallback(() => {
    authService.logout();
  }, []);
  const userMenu = (
    <Menu>
      <Menu.Item key="1" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={style.root}>
      <Dropdown arrow overlay={userMenu} placement="bottomLeft">
        <Avatar
          icon={<UserOutlined />}
          style={{
            backgroundColor: '#90B3C7',
            width: '40px',
            height: '40px',
            padding: '3px 8px',
          }}
        />
      </Dropdown>
    </div>
  );
});
