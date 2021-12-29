import { Dropdown, DropDownProps } from 'antd';
import React, { FC } from 'react';

import { ReactComponent as MoreIcon } from '../../resources/more.svg';

type MoreDropdownProps = {
  className?: string;
  menu: DropDownProps['overlay'];
};

export const MoreDropdown: FC<MoreDropdownProps> = function MoreDropdown({
  className,
  menu,
}) {
  return (
    <Dropdown
      className={className}
      overlay={menu}
      placement={'bottomRight'}
      trigger={['click']}
    >
      <MoreIcon fill="#243B50" height={16} width={16} />
    </Dropdown>
  );
};
