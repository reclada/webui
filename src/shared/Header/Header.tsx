import { Dropdown } from 'antd';
import React, { ReactElement } from 'react';

import { ReactComponent as Account } from 'src/resources/account.svg';
import { ReactComponent as ArrowDown } from 'src/resources/arrow-down.svg';
import { ReactComponent as Notifications } from 'src/resources/notifications.svg';
import { ReactComponent as Settings } from 'src/resources/settings.svg';

import { Categories } from '../Categories/Categories';
import { Marker } from '../Marker/Marker';
import { Menu } from '../Menu/Menu';

import styles from './Header.module.scss';

const UserActions = (): ReactElement => (
  <Menu>
    <Menu.Item
      leftIcon={<Notifications />}
      rightIcon={<Marker>4</Marker>}
      value="notifications"
    >
      Notifications
    </Menu.Item>
    <Menu.Item leftIcon={<Settings />} value="settings">
      Settings
    </Menu.Item>
    <Menu.Item leftIcon={<Account />} value="profile">
      Profile
    </Menu.Item>

    <Menu.Divider />

    <Menu.Item value="log out">Log out</Menu.Item>
  </Menu>
);

export const Header = (): ReactElement => {
  return (
    <div className={styles.container}>
      <Categories />

      <Dropdown
        openClassName={styles.userDropdownOpened}
        overlay={UserActions}
        trigger={['click']}
      >
        <div className={styles.userDropdown}>
          <Marker className={styles.marker}>4</Marker>

          <img alt="" className={styles.avatar} src="/images/avatar.png" />

          <ArrowDown height={20} width={20} />
        </div>
      </Dropdown>
    </div>
  );
};
