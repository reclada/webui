import Icon from '@ant-design/icons';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';

import { ReactComponent as LoginIcon } from '../../resources/login.svg';
import { userService } from '../../services/userService';

import style from './Navigation.module.scss';
import { UserBadge } from './UserBadge/UserBadge';

export const Navigation: FC = observer(function Navigation() {
  const isLogged = userService.user.isLogged;

  const login = useCallback(() => {
    userService.login();
  }, []);

  console.log('isLogged', isLogged);

  return (
    <div className={style.root}>
      {!isLogged && (
        <Button
          ghost
          icon={<Icon component={LoginIcon} />}
          shape="circle"
          size="large"
          type="primary"
          onClick={login}
        >
          Login
        </Button>
      )}

      {isLogged && <UserBadge />}
    </div>
  );
});
