import { Result, TableColumnType } from 'antd';
import React, { FC, useEffect, useState } from 'react';

import { fetchDatasources, IDatasource } from '../../../../api/datasourcesService';
import { Table } from '../../../../shared/Table/Table';
import { OwnersRenderer } from '../shared/OwnersRenderer/OwnersRenderer';

import { ArticleNameRenderer } from './ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from './ArticleTypeRenderer/ArticleTypeRenderer';
import { MoreMenuRenderer } from './MoreMenuRenderer/MoreMenuRenderer';

const columns: TableColumnType<IDatasource>[] = [
  {
    dataIndex: 'article',
    title: 'Type',
    render: (article: IDatasource['article']) => (
      <ArticleTypeRenderer article={article} />
    ),
  },
  {
    dataIndex: 'article',
    title: 'Name',
    render: (article: IDatasource['article']) => (
      <ArticleNameRenderer article={article} />
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
    render: (owners: IDatasource['owner']) => <OwnersRenderer owners={owners} />,
  },
  {
    render: () => <MoreMenuRenderer />,
  },
];

type DatasourcesTableProps = {
  datasetId?: string;
};

export const DatasourcesTable: FC<DatasourcesTableProps> = function DatasourcesTable({
  datasetId,
}) {
  const [datasources, setDatasources] = useState<IDatasource[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setDatasources(undefined);
    setIsError(false);

    fetchDatasources(datasetId)
      .then(({ datasources }) => {
        setDatasources(datasources);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [datasetId]);

  if (isError) {
    return (
      <Result
        status="error"
        subTitle="Please, try again"
        title="Failed to load datasources"
      />
    );
  }

  return (
    <Table columns={columns} dataSource={datasources} loading={isLoading} rowKey="id" />
  );
};
