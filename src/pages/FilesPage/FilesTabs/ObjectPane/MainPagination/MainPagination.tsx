import { observer } from 'mobx-react-lite';
import React from 'react';

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
  const { service } = useObjectContext();

  const handleChangePageSize = (pageSize: string | number) =>
    service.listStore.setPageSize(Number(pageSize));

  return (
    <div className={styles.container}>
      <Pagination
        page={service.currentPage + 1}
        pageSize={service.pageSize}
        total={service.count}
        onChange={(page: number) => console.log(page)}
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
