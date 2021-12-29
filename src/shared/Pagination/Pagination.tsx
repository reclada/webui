import React, { memo, ReactElement, useCallback } from 'react';

import { ReactComponent as LeftArrow } from '../../resources/arrow-left.svg';
import { ReactComponent as RightArrow } from '../../resources/arrow-right.svg';

import style from './Pagination.module.scss';

interface PaginationProps {
  page: number;
  pageSize: number;
  onChange: (page: number) => void;
  total: number;
}

export const Pagination = memo(
  ({ page, pageSize, onChange, total }: PaginationProps): ReactElement => {
    const pagesCount = Math.ceil(total / pageSize);

    const handlePreviousPage = useCallback(() => onChange(Math.max(page - 1, 1)), [
      onChange,
      page,
    ]);

    const handleNextPage = useCallback(() => onChange(Math.min(page + 1, pagesCount)), [
      onChange,
      page,
      pagesCount,
    ]);

    return (
      <div className={style.root}>
        <button
          className={style.button}
          disabled={page === 1}
          onClick={handlePreviousPage}
        >
          <LeftArrow height={16} width={16} />
        </button>

        <span className={style.page}>{page}</span>

        <button
          className={style.button}
          disabled={page === pagesCount}
          onClick={handleNextPage}
        >
          <RightArrow height={16} width={16} />
        </button>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
