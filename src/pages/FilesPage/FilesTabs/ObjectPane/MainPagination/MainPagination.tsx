import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';

import { Pagination } from 'src/shared/Pagination/Pagination';
import { Select } from 'src/shared/Select/Select';

import { useObjectContext } from '../ObjectContext';

import styles from './MainPagination.module.scss';

const pageSizeOptions = [
  {
    value: 40,
    label: 40,
  },
  {
    value: 60,
    label: 60,
  },
  {
    value: 80,
    label: 80,
  },
];

export const MainPagination = observer(() => {
  const { service, scrollToPage } = useObjectContext();

  const handleChangePageSize = (pageSize: string | number) =>
    service.listStore.setPageSize(Number(pageSize));

  const handleChange = useCallback((page: number) => scrollToPage(page - 1), [
    scrollToPage,
  ]);

  return (
    <div className={styles.container}>
      <Pagination
        page={service.currentPage + 1}
        pageSize={service.pageSize}
        total={service.count}
        onChange={handleChange}
      />

      <div className={styles.pageSizeContainer}>
        <p className={styles.pageSize}>Results per page:</p>
        <Select
          className={styles.select}
          options={pageSizeOptions}
          value={service.pageSize}
          onChange={handleChangePageSize}
        />
      </div>
    </div>
  );
});
