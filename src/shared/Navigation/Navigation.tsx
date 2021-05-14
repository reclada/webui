import Icon from '@ant-design/icons';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';

import { authService } from 'src/services/authService';

import { ReactComponent as LoginIcon } from '../../resources/login.svg';

import style from './Navigation.module.scss';
import { UserBadge } from './UserBadge/UserBadge';

export const Navigation: FC = observer(function Navigation() {
  const isLogged = authService.user.isLogged;

  console.log('isLogged', isLogged);

  const login = useCallback(() => {
    authService.login();
    // const features = 'width=800, height=500, left=300, top=200';
    // const externalWindow = window.open('', '', features);
  }, []);

  return (
    <div className={style.root}>
      {!isLogged && (
        <Button
          ghost
          icon={<Icon component={LoginIcon} />}
          shape="round"
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
