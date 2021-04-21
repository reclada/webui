import { TableColumnType } from 'antd';
import React, { FC, useMemo } from 'react';

import { IDataset } from '../../../../../api/datasetsService';
import { Table } from '../../../../../shared/Table/Table';
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
      },
      {
        dataIndex: 'author',
        title: 'Author',
      },
      {
        dataIndex: 'lastUpdate',
        title: 'Last update',
      },
      {
        dataIndex: 'whoUpdated',
        title: 'Who updated',
      },
      {
        dataIndex: 'owner',
        title: 'Owner',
        render: (owners: IDataset['owner']) => <OwnersRenderer owners={owners} />,
      },
      {
        render: () => <MoreMenuRenderer />,
      },
    ],
    [onSelectDataset]
  );

  return (
    <Table columns={columns} dataSource={datasets} loading={isLoading} rowKey="id" />
  );
};
