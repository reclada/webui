import React, { FC } from 'react';

import { classNames } from '../../../../../../utils/classNames';

import style from './SearchTerm.module.scss';

type SearchTermProps = {
  className?: string;
  title: string;
  count: number;
  color: string;
};

export const SearchTerm: FC<SearchTermProps> = React.memo(function SearchTerm({
  className,
  title,
  count,
  color,
}) {
  return (
    <div className={classNames(className, style.root)} style={{ backgroundColor: color }}>
      <div className={style.title}>{title}</div>
      <div className={style.count}>{count}</div>
    </div>
  );
});
