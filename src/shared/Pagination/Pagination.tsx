import { observer } from 'mobx-react-lite';
import React, { ReactElement, useCallback } from 'react';

import { useObjectContext } from 'src/pages/FilesPage/FilesTabs/ObjectPane/ObjectContext';

import { ReactComponent as LeftArrow } from '../../resources/arrow-left.svg';
import { ReactComponent as RightArrow } from '../../resources/arrow-right.svg';

import style from './Pagination.module.scss';

export const Pagination = observer(
  (): ReactElement => {
    const {
      service: { pageSize, count, currentPage },
      scrollToPage,
    } = useObjectContext();
    const pagesCount = Math.ceil(count / pageSize);

    const page = currentPage + 1;

    const onChange = useCallback((page: number) => scrollToPage(page - 1), [
      scrollToPage,
    ]);

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
