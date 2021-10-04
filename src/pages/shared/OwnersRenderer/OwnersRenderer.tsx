import { Dropdown, Menu } from 'antd';
import React, { FC, memo } from 'react';

import { ReactComponent as MenuArrowIcon } from 'src/resources/menu-arrow.svg';

import style from './OwnersRenderer.module.scss';

type OwnersRendererProps = {
  owners: string[];
};

export const OwnersRenderer: FC<OwnersRendererProps> = memo(function OwnersRenderer({
  owners,
}) {
  const menu = (
    <Menu className={style.menu} theme="dark">
      {owners.map((owner, index) => (
        <Menu.Item key={index}>
          <a>{owner}</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      {owners.length > 1 ? (
        <Dropdown overlay={menu} placement={'bottomRight'} trigger={['click']}>
          <div className={style.menuHeader}>
            Multiple owners <MenuArrowIcon />
          </div>
        </Dropdown>
      ) : (
        <>{owners[0] ?? null}</>
      )}
    </>
  );
});
