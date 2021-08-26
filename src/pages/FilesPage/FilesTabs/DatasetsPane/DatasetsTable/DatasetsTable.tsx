import { TableColumnType } from 'antd';
import React, { FC, useMemo } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';
import { Table } from 'src/shared/Table/Table';

import { OwnersRenderer } from '../../shared/OwnersRenderer/OwnersRenderer';

import { DatasetNameRenderer } from '../DatasetNameRenderer/DatasetNameRenderer';
import { MoreMenuRenderer } from './MoreMenuRenderer/MoreMenuRenderer';

type DatasetsTableProps = {
  datasets: IDataset[] | undefined;
  isLoading: boolean;
  onSelectDataset: (dataset: IDataset) => void;
  onUpdate: (name: string, datasetId: string) => void;
  onClickHeader: (key: string) => void;
};

export const DatasetsTable: FC<DatasetsTableProps> = function DatasetsTable({
  datasets,
  isLoading,
  onSelectDataset,
  onUpdate,
  onClickHeader,
}) {
  const columns: TableColumnType<IDataset>[] = useMemo(
    () => [
      {
        key: 'name',
        title: 'Name',
        render: (_, dataset: IDataset) => (
          <DatasetNameRenderer dataset={dataset} onSelect={onSelectDataset} />
        ),

        onHeaderCell: column => {
          return {
            onClick: () => {
              console.log('onHeaderCell');
              onClickHeader('attrs, name');
            },
          };
        },
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
        render: (_, dataset) => (
          <MoreMenuRenderer
            dataSetId={dataset.id}
            prevName={dataset.title}
            onUpdate={onUpdate}
          />
        ),
      },
    ],
    [onSelectDataset, onUpdate]
  );

  return (
    <Table columns={columns} dataSource={datasets} loading={isLoading} rowKey="id" />
  );
};
