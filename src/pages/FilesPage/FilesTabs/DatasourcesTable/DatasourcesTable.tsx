import { TableColumnType } from 'antd';
import React, { FC } from 'react';

import { IDatasourceResponseObject } from '../../../../api/datasourcesService';
import { Table } from '../../../../shared/Table/Table';

import { ArticleNameRenderer } from './ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from './ArticleTypeRenderer/ArticleTypeRenderer';
import { MoreMenuRenderer } from './MoreMenuRenderer/MoreMenuRenderer';
import { OwnersRenderer } from './OwnersRenderer/OwnersRenderer';

const columns: TableColumnType<IDatasourceResponseObject>[] = [
  {
    dataIndex: 'article',
    title: 'Type',
    render: (article: IDatasourceResponseObject['article']) => (
      <ArticleTypeRenderer article={article} />
    ),
  },
  {
    dataIndex: 'article',
    title: 'Name',
    render: (article: IDatasourceResponseObject['article']) => (
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
    render: (owners: IDatasourceResponseObject['owner']) => (
      <OwnersRenderer owners={owners} />
    ),
  },
  {
    render: () => <MoreMenuRenderer />,
  },
];

type DatasourcesTableProps = {
  datasources: IDatasourceResponseObject[];
};

export const DatasourcesTable: FC<DatasourcesTableProps> = function DatasourcesTable({
  datasources,
}) {
  return <Table columns={columns} dataSource={datasources} rowKey="id" />;
};
