import { Breadcrumb } from 'antd';
import React, { FC } from 'react';

import { IRecladaDataset } from 'src/api/IRecladaObject';

import style from './DatasetsPaneBreadcrumbs.module.scss';

type DatasetsPaneBreadcrumbsProps = {
  selectedDataset: IRecladaDataset;
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
      <Breadcrumb.Item>{selectedDataset['{attributes,name}']}</Breadcrumb.Item>
    </Breadcrumb>
  );
};
