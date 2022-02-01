import React, { memo, ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import { BasicGridItem } from 'src/types/GridLayout';

import { GridLayout } from '../GridLayout';

interface Props {
  routes?: Record<string, BasicGridItem>;
}

export const Router = memo(
  ({ routes = {} }: Props): ReactElement => (
    <Switch>
      {Object.keys(routes ?? {}).map(route => (
        <Route key={route} path={route}>
          {routes[route] && <GridLayout layout={routes[route]} />}
        </Route>
      ))}
    </Switch>
  )
);

Router.displayName = 'Router';
