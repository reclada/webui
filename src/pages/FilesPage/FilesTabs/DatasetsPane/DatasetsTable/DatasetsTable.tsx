import { TableColumnType } from 'antd';
import { IDataset } from 'api/datasetsDataGateService';
import React, { FC, useMemo } from 'react';
import { Table } from 'shared/Table/Table';

import { MoreMenuRenderer } from '../../DatasourcesTable/MoreMenuRenderer/MoreMenuRenderer';
import { OwnersRenderer } from '../../shared/OwnersRenderer/OwnersRenderer';

import { DatasetNameRenderer } from './DatasetNameRenderer/DatasetNameRenderer';

type DatasetsTableProps = {
  datasets: IDataset[] | undefined;
  isLoading: boolean;
  onSelectDataset: (dataset: IDataset) => void;
};

export const DatasetsTable: FC<DatasetsTableProps> = function DatasetsTable({
  datasets,
  isLoading,
  onSelectDataset,
}) {
  const columns: TableColumnType<IDataset>[] = useMemo(
    () => [
      {
        key: 'name',
        title: 'Name',
        render: (_, dataset: IDataset) => (
          <DatasetNameRenderer dataset={dataset} onSelect={onSelectDataset} />
        ),
      },
      {
        dataIndex: 'createDate',
        title: 'Create date',
        render: (date: Date) =>
          date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
      },
      {
        dataIndex: 'author',
        title: 'Author',
      },
      {
        dataIndex: 'lastUpdate',
        title: 'Last update',
        render: (date: Date) =>
          date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
      },
      {
        dataIndex: 'whoUpdated',
        title: 'Who updated',
      },
      {
        dataIndex: 'owners',
        title: 'Owner',
        render: (owners: IDataset['owners']) => <OwnersRenderer owners={owners} />,
      },
      {
        render: (_, dataset) => <MoreMenuRenderer datasourceId={dataset.id} />,
      },
    ],
    [onSelectDataset]
  );

  return (
    <Table columns={columns} dataSource={datasets} loading={isLoading} rowKey="id" />
  );
};
