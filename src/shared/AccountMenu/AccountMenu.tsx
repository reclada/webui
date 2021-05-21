import React, { FC } from 'react';

import { classNames } from '../../utils/classNames';

import style from './AccountMenu.module.scss';

type AccountMenuProps = {
  className?: string;
};

export const AccountMenu: FC<AccountMenuProps> = function AccountMenu({ className }) {
  return (
    <div className={classNames(className, style.root)}>
      <p className={style.title}>username</p>
      <div className={style.avatar} />
    </div>
  );
};
