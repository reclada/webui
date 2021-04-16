import { Dropdown, Menu } from 'antd';
import React, { FC } from 'react';

import { ReactComponent as MoreIcon } from '../../../../../resources/more.svg';

import style from './MoreMenuRenderer.module.scss';

export const MoreMenuRenderer: FC = function MoreMenuRenderer() {
  const moreMenu = (
    <Menu className={style.menu}>
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

  return (
    <Dropdown overlay={moreMenu} placement={'bottomRight'} trigger={['click']}>
      <MoreIcon />
    </Dropdown>
  );
};
