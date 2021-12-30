import { Table as AntTable, TableProps as AntTableProps } from 'antd';
import React, { useMemo } from 'react';

const defaultTablePagination: AntTableProps<any>['pagination'] = {
  hideOnSinglePage: true,
  showSizeChanger: false,
  position: ['bottomCenter'],
};

export const Table = function Table<T extends object>({
  pagination: paginationProp,
  ...restProps
}: AntTableProps<T>) {
  const pagination: AntTableProps<T>['pagination'] = useMemo(
    () =>
      paginationProp !== false ? { ...defaultTablePagination, ...paginationProp } : false,
    [paginationProp]
  );

  return <AntTable pagination={pagination} {...restProps} />;
};
