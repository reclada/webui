import Pagination from 'rc-pagination';
import React, { FC, useCallback, useState } from 'react';

import { ReactComponent as DoubleLeftArrow } from '../../resources/arrow-double-left.svg';
import { ReactComponent as DoubleRightArrow } from '../../resources/arrow-double-right.svg';
import { ReactComponent as LeftArrow } from '../../resources/arrow-left.svg';
import { ReactComponent as RightArrow } from '../../resources/arrow-right.svg';
import { classNames } from '../../utils/classNames';

import style from './Paginator.module.scss';

type PaginatorProps = {
  className?: string;
};

export const Paginator: FC<PaginatorProps> = React.memo(function Paginator({
  className,
}) {
  const [currentPage, setCurrentPage] = useState(30);

  const setFirst = useCallback(() => setCurrentPage(1), []);
  const setLast = useCallback(() => setCurrentPage(150), []);

  return (
    <div className={classNames(className, style.root)}>
      <button
        className={style.leftButton}
        disabled={currentPage === 1}
        onClick={setFirst}
      >
        <DoubleLeftArrow />
      </button>
      <Pagination
        current={currentPage}
        jumpNextIcon={'...'}
        jumpPrevIcon={'...'}
        nextIcon={
          <>
            <div>Next</div>
            <RightArrow />
          </>
        }
        pageSize={30}
        prevIcon={
          <>
            <LeftArrow />
            <div>Previous</div>
          </>
        }
        showTitle={false}
        total={4489}
        onChange={setCurrentPage}
      />
      <button
        className={style.rightButton}
        disabled={currentPage === 150}
        onClick={setLast}
      >
        <DoubleRightArrow />
      </button>
    </div>
  );
});
