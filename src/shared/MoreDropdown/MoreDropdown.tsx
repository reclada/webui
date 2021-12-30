import { Dropdown, DropDownProps } from 'antd';
import React, { FC } from 'react';

import { ReactComponent as MoreIcon } from '../../resources/more.svg';

type MoreDropdownProps = {
  menu: DropDownProps['overlay'];
};

export const MoreDropdown: FC<MoreDropdownProps> = function MoreDropdown({ menu }) {
  return (
    <Dropdown overlay={menu} placement={'bottomRight'} trigger={['click']}>
      <MoreIcon />
    </Dropdown>
  );
};
