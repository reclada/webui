import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

import { userService } from '../../../services/userService';

import style from './UserBadge.module.scss';

export const UserBadge: FC = observer(function UserBadge() {
  const userName = userService.user.userName;

  return (
    <div className={style.root}>
      <div>{userName}</div>
      <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
    </div>
  );
});
