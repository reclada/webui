import { Avatar } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';

import { authService } from 'src/services/authService';

import { ReactComponent as LoginIcon } from '../../resources/login.svg';

import style from './Navigation.module.scss';
import { UserBadge } from './UserBadge/UserBadge';

export const Navigation: FC = observer(function Navigation() {
  const isLogged = authService.user.isLogged;

  const login = useCallback(() => {
    authService.login();
    // const features = 'width=800, height=500, left=300, top=200';
    // const externalWindow = window.open('', '', features);
  }, []);

  return (
    <div className={style.avatar}>
      {!isLogged && (
        <div onClick={login} className={style.loginBtn}>
          <Avatar
            icon={<LoginIcon />}
            style={{
              backgroundColor: '#90B3C7',
              width: '40px',
              height: '40px',
              padding: '7px',
            }}
          />
        </div>
      )}

      {isLogged && <UserBadge />}
    </div>
  );
});
