import React, { FC } from 'react';

import style from './TermItem.module.scss';

export interface ITerm {
  term: string;
  count: number;
}

type TermItemProps = {
  term: ITerm;
};

export const TermItem: FC<TermItemProps> = function TermItem({ term }) {
  return (
    <div className={style.root}>
      <div className={style.term}>{term.term}</div>
      <div className={style.count}>{term.count}</div>
    </div>
  );
};
