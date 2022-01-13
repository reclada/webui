import React from 'react';

import { ReactComponent as GlobalIcon } from 'src/resources/global.svg';
import { ReactComponent as SettingsIcon } from 'src/resources/settings-filled.svg';

import { routes } from '../../routes';

export const Menu2Content = {
  items: [
    {
      title: 'Browser',
      icon: <GlobalIcon height={16} width={16} />,
      items: [
        {
          route: routes.files,
          label: 'Data Sources',
        },
        {
          route: routes.datasets,
          label: 'Data sets',
        },
        {
          route: routes.assets,
          label: 'Assets',
        },
        {
          route: routes.available,
          label: 'Available to me',
        },
      ],
    },
    {
      title: 'Settings',
      icon: <SettingsIcon height={16} width={16} />,
      items: [
        {
          route: '/help',
          label: 'Help',
        },
        {
          route: '/main-settings',
          label: 'Main settings',
        },
        {
          route: '/advanced-settings',
          label: 'Advanced settings',
        },
      ],
    },
  ],
};
