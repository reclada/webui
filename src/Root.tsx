import React, { memo, ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { GridLayout } from './grid/GridLayout';
import config from './ui-config.json';
import { eventEmitter } from './utils/EventEmitter';

export const Root = memo(
  (): ReactElement => {
    const history = useHistory();

    useEffect(() => {
      const handleRedirect = (route: string) => history.push(route);

      eventEmitter.on('REDIRECT', handleRedirect);

      return () => eventEmitter.off('REDIRECT', handleRedirect);
    }, [history]);

    return <GridLayout layout={config} />;
  }
);

Root.displayName = 'Root';
