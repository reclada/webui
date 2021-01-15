import React, { FC } from 'react';

import style from './Icon.module.scss';

type IconProps = {
  query: string;
};

export const Icon: FC<IconProps> = function Icon() {
  return <div className={style.root}></div>;
};
