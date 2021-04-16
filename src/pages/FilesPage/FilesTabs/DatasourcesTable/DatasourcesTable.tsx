import { Dropdown, Menu, TableColumnType } from 'antd';
import React, { FC } from 'react';

import { IDatasourceResponseObject } from '../../../../api/datasourcesService';
import { ReactComponent as MenuArrowIcon } from '../../../../resources/menu-arrow.svg';
import { ReactComponent as MoreIcon } from '../../../../resources/more.svg';
import { Table } from '../../../../shared/Table/Table';
import { ArticlesListItem } from '../../../SearchResultPage/SearchResultMain/ArticlesList/ArticlesListItem/ArticlesListItem';

import style from './DatasourcesTable.module.scss';

const columns: TableColumnType<IDatasourceResponseObject>[] = [
  {
    dataIndex: 'article',
    render: (article: IDatasourceResponseObject['article']) => (
      <ArticlesListItem article={article} isMinimized={true} />
    ),
  },
  { dataIndex: 'createDate' },
  { dataIndex: 'author' },
  { dataIndex: 'lastUpdate' },
  { dataIndex: 'whoUpdated' },
  {
    dataIndex: 'owner',
    render: (owners: IDatasourceResponseObject['owner']) => {
      const menu = (
        <Menu className={style.menu}>
          {owners.map((owner, index) => (
            <Menu.Item key={index}>
              <a>{owner}</a>
            </Menu.Item>
          ))}
        </Menu>
      );

      return (
        <>
          {owners.length > 1 ? (
            <Dropdown overlay={menu} placement={'bottomRight'} trigger={['click']}>
              <div className={style.menuHeader}>
                Multiple owners <MenuArrowIcon />
              </div>
            </Dropdown>
          ) : (
            <>{owners[0] ?? null}</>
          )}
        </>
      );
    },
  },
  {
    render: () => {
      const moreMenu = (
        <Menu className={style.menu}>
          <Menu.Item key={1}>
            <span>Data set</span>
          </Menu.Item>
          <Menu.Item key={2}>
            <span>Version</span>
          </Menu.Item>
          <Menu.Item key={3}>
            <span>Edit</span>
          </Menu.Item>
          <Menu.Item key={4}>
            <span>Permissions</span>
          </Menu.Item>
          <Menu.Item key={5}>
            <span>Share</span>
          </Menu.Item>
          <Menu.Item key={6}>
            <span>Delete</span>
          </Menu.Item>
        </Menu>
      );

      return (
        <Dropdown overlay={moreMenu} placement={'bottomRight'} trigger={['click']}>
          <MoreIcon />
        </Dropdown>
      );
    },
  },
];

type DatasourcesTableProps = {
  datasources: IDatasourceResponseObject[];
};

export const DatasourcesTable: FC<DatasourcesTableProps> = function DatasourcesTable({
  datasources,
}) {
  return (
    <Table
      columns={columns}
      dataSource={datasources}
      pagination={{ total: 150 }}
      rowKey="id"
    />
  );
};
