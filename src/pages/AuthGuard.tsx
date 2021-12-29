import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { routes } from 'src/pages/routes';
import { authService } from 'src/services/authService';

export const AuthGuard: FC = observer(({ children }) => {
  return authService.user.isLogged ? <>{children}</> : <Redirect to={routes.root} />;
});
