import { Breadcrumb } from 'antd';
import React, { FC } from 'react';

import { IDataset } from '../../../../../api/datasetsService';

import style from './DatasetsPaneBreadcrumbs.module.scss';

type DatasetsPaneBreadcrumbsProps = {
  selectedDataset: IDataset;
  onUnselectDataset: () => void;
};

export const DatasetsPaneBreadcrumbs: FC<DatasetsPaneBreadcrumbsProps> = function DatasetsPaneBreadcrumbs({
  selectedDataset,
  onUnselectDataset,
}) {
  return (
    <Breadcrumb className={style.breadcrumbs}>
      <Breadcrumb.Item className={style.breadcrumbParent} onClick={onUnselectDataset}>
        Datasets
      </Breadcrumb.Item>
      <Breadcrumb.Item>{selectedDataset.title}</Breadcrumb.Item>
    </Breadcrumb>
  );
};
