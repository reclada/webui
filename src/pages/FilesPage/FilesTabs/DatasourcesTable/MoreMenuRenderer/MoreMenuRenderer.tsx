import { Menu } from 'antd';
import React, { FC } from 'react';

import { MoreDropdown } from '../../../../../shared/MoreDropdown/MoreDropdown';

export const MoreMenuRenderer: FC = function MoreMenuRenderer() {
  const moreMenu = (
    <Menu>
      <Menu.Item key={1}>
        <span>Data set</span>
      </Menu.Item>
      <Menu.Item key={2}>
        <span>Version</span>
      </Menu.Item>
      <Menu.Item key={3}>
        <span>Edit</span>
      </Menu.Item>
      <Menu.Item key={4}>
        <span>Permissions</span>
      </Menu.Item>
      <Menu.Item key={5}>
        <span>Share</span>
      </Menu.Item>
      <Menu.Item key={6}>
        <span>Delete</span>
      </Menu.Item>
    </Menu>
  );

  return <MoreDropdown menu={moreMenu} />;
};
