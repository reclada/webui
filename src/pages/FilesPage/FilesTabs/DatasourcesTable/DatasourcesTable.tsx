import { Result, TableColumnType } from 'antd';
import { SelectionSelectFn, TableRowSelection } from 'antd/lib/table/interface';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useState } from 'react';

import { datasourceTableService } from 'src/pages/FilesPage/FilesTabs/DatasourcesTable/datasourceTable.service';

import { fetchDatasources, IDatasource } from '../../../../api/datasourcesService';
import { Table } from '../../../../shared/Table/Table';
import { OwnersRenderer } from '../shared/OwnersRenderer/OwnersRenderer';

import { ArticleNameRenderer } from './ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from './ArticleTypeRenderer/ArticleTypeRenderer';
import { MoreMenuRenderer } from './MoreMenuRenderer/MoreMenuRenderer';

type DatasourcesTableProps = {
  datasetId?: string;
};

export const DatasourcesTable: FC<DatasourcesTableProps> = observer(
  function DatasourcesTable({ datasetId }) {
    const [datasources, setDatasources] = useState<IDatasource[] | undefined>(undefined);

    const columns: TableColumnType<IDatasource>[] = [
      {
        dataIndex: 'type',
        title: 'Type',
        render: (type: IDatasource['type']) => <ArticleTypeRenderer articleType={type} />,
      },
      {
        dataIndex: 'name',
        title: 'Name',
        render: (name: IDatasource['name']) => <ArticleNameRenderer title={name} />,
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
        render: (owners: IDatasource['owners']) => <OwnersRenderer owners={owners} />,
      },
      {
        render: (_, datasource) => (
          <MoreMenuRenderer
            datasource={datasource}
            onUpdate={(name, datasetId) => {
              const newDataset = datasources?.find(foo => foo.id === datasetId);

              if (newDataset !== undefined) newDataset.name = name;

              if (datasources !== undefined) {
                setDatasources([...datasources]);
              }
            }}
          />
        ),
      },
    ];

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const UpdateDatasources = useCallback(() => {
      setIsLoading(true);
      setDatasources(undefined);
      setIsError(false);

      fetchDatasources(datasetId)
        .then(datasources => {
          setDatasources(datasources);
          setIsLoading(false);
        })
        .catch(res => {
          setIsError(true);
          setIsLoading(false);
          setErrorMessage(res.message);
        });
    }, [datasetId]);

    useEffect(() => {
      UpdateDatasources();
    }, [datasetId, UpdateDatasources]);

    const onSelect: SelectionSelectFn<IDatasource> = useCallback(
      (record: IDatasource, selected: boolean) => {
        datasourceTableService.selectDataSource(record, selected);
      },
      []
    );

    const rowSelection: TableRowSelection<any> = {
      selectedRowKeys: datasourceTableService.selectedRows,
      onSelect,
    };

    if (isError) {
      return (
        <Result
          status="error"
          subTitle={
            errorMessage.includes('NoneType')
              ? 'You can create them right now'
              : 'Please, try again'
          }
          title={
            errorMessage.includes('NoneType')
              ? 'You have no datasources'
              : 'Failed to load datasources'
          }
        />
      );
    }

    return (
      <Table
        columns={columns}
        dataSource={datasources}
        loading={isLoading}
        rowKey="id"
        rowSelection={rowSelection}
      />
    );
  }
);
