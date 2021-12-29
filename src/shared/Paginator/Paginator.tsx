import Pagination from 'rc-pagination';
import React, { FC } from 'react';

import { ReactComponent as LeftArrow } from '../../resources/arrow-left.svg';
import { ReactComponent as RightArrow } from '../../resources/arrow-right.svg';
import { classNames } from '../../utils/classNames';

import style from './Paginator.module.scss';

type PaginatorProps = {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
  className?: string;
};

export const Paginator: FC<PaginatorProps> = React.memo(
  ({ page, pageSize, total, onChange, className }: PaginatorProps) => (
    <div className={classNames(className, style.root)}>
      <Pagination
        current={page}
        nextIcon={<RightArrow />}
        pageSize={pageSize}
        prevIcon={<LeftArrow />}
        showTitle={false}
        total={total}
        onChange={onChange}
      />
    </div>
  )
);
