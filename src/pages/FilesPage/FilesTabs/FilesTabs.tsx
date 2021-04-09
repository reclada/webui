import { Tabs } from 'antd';
import React from 'react';

import { mockedDatasource } from '../../../api/datasourcesService';
import { ReactComponent as AssetsIcon } from '../../../resources/assets.svg';
import { ReactComponent as DatasetsIcon } from '../../../resources/datasets.svg';
import { ReactComponent as DatasourceIcon } from '../../../resources/datasources.svg';
import { Paginator } from '../../../shared/Paginator/Paginator';

import { DatasourcesTable } from './DatasourcesTable/DatasourcesTable';
import style from './FilesTabs.module.scss';

export const FilesTabs: React.FC = function FilesPage() {
  const { TabPane } = Tabs;

  const callback = () => {
    console.log('Tab');
  };

  return (
    <div className={style.root}>
      <Tabs defaultActiveKey="1" onChange={callback} className={style.tabs}>
        <TabPane
          tab={
            <span className={style.tabHeader}>
              <DatasourceIcon />
              Datasources
            </span>
          }
          key="1"
        >
          <DatasourcesTable datasources={mockedDatasource} />
          <div className={style.paginator}>
            <Paginator />
          </div>
        </TabPane>
        <TabPane
          tab={
            <span className={style.tabHeader}>
              <DatasetsIcon />
              Datasets
            </span>
          }
          key="2"
        >
          Content 2
        </TabPane>
        <TabPane
          tab={
            <span className={style.tabHeader}>
              <AssetsIcon />
              Assets
            </span>
          }
          key="3"
        >
          Content 3
        </TabPane>
        <TabPane
          tab={
            <span className={style.tabHeader}>
              <DatasourceIcon />
              Available to me
            </span>
          }
          key="4"
        >
          Content 4
        </TabPane>
      </Tabs>
    </div>
  );
};
