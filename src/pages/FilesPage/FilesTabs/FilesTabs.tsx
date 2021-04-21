import { Tabs } from 'antd';
import React from 'react';

import { ReactComponent as AssetsIcon } from '../../../resources/assets.svg';
import { ReactComponent as DatasetsIcon } from '../../../resources/datasets.svg';
import { ReactComponent as DatasourceIcon } from '../../../resources/datasources.svg';

import { DatasetsPane } from './DatasetsPane/DatasetsPane';
import { DatasourcesTable } from './DatasourcesTable/DatasourcesTable';
import style from './FilesTabs.module.scss';

export const FilesTabs: React.FC = function FilesPage() {
  const { TabPane } = Tabs;

  const callback = () => {
    console.log('Tab');
  };

  return (
    <div className={style.root}>
      <Tabs className={style.tabs} defaultActiveKey="1" onChange={callback}>
        <TabPane
          key="1"
          tab={
            <span className={style.tabHeader}>
              <DatasourceIcon />
              Datasources
            </span>
          }
        >
          <DatasourcesTable />
        </TabPane>
        <TabPane
          key="2"
          tab={
            <span className={style.tabHeader}>
              <DatasetsIcon />
              Datasets
            </span>
          }
        >
          <DatasetsPane />
        </TabPane>
        <TabPane
          key="3"
          tab={
            <span className={style.tabHeader}>
              <AssetsIcon />
              Assets
            </span>
          }
        >
          Content 3
        </TabPane>
        <TabPane
          key="4"
          tab={
            <span className={style.tabHeader}>
              <DatasourceIcon />
              Available to me
            </span>
          }
        >
          Content 4
        </TabPane>
      </Tabs>
    </div>
  );
};
