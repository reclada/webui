import { observer } from 'mobx-react-lite';
import React from 'react';
import { FC } from 'react';

import { IRecladaObject } from 'src/api/IRecladaObject';
import BaseListStore from 'src/stores/BaseListStore';

import style from './Pager.module.scss';

type PagerProps = {
  service: BaseListStore<IRecladaObject>;
};

export const Pager: FC<PagerProps> = observer(function Pager({ service }) {
  return <div className={style.pager}>{service.currentPage + 1}</div>;
});
