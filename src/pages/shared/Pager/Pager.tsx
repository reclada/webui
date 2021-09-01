import { observer } from 'mobx-react-lite';
import React from 'react';
import { FC } from 'react';

import { BaseListStoreType } from 'src/stores/BaseListStore';

import style from './Pager.module.scss';

type PagerProps = {
  service: BaseListStoreType;
};

export const Pager: FC<PagerProps> = observer(function Pager({ service }) {
  return <div className={style.pager}>{service.currentPage + 1}</div>;
});