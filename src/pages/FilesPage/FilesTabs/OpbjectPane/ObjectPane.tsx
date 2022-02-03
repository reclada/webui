import { Col, Divider, Result, Row, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect } from 'react';

import { IRecladaObject } from 'src/api/IRecladaObject';
import { ResultToolbar } from 'src/pages/shared/ResultToolbar/ResultToolbar';
import { InfiniteList } from 'src/shared/InfiniteList/InfiniteList';
import BaseListStore, { BaseListStoreType } from 'src/stores/BaseListStore';
import { DisplayingTypes, RecladaOrder } from 'src/stores/Types';

import { Pager } from '../../../shared/Pager/Pager';
import { DatasetsCardsRow } from '../DatasetsPane/DatasetsCardsRow/DatasetsCardsRow';
import { DatasetsPaneBreadcrumbs } from '../DatasetsPane/DatasetsPaneBreadcrumbs/DatasetsPaneBreadcrumbs';
import { DatasetsTableInfRow } from '../DatasetsPane/DatasetsTableInfRow/DatasetsTableInfRow';
import { DatasourcesPane } from '../DatasourcesPane/DatasourcesPane';

//import { DatasourcesPane } from '../DatasourcesPane/DatasourcesPane';

//import { DatasetsCardsRow } from './DatasetsCardsRow/DatasetsCardsRow';
//import { service } from './datasetsData.service';
import style from './ObjectPane.module.scss';
//import { DatasetsPaneBreadcrumbs } from './DatasetsPaneBreadcrumbs/DatasetsPaneBreadcrumbs';
//import { DatasetsTableInfRow } from './DatasetsTableInfRow/DatasetsTableInfRow';

interface IObjectServiceInterface {
  isError: boolean;
  isLoading: boolean;
  activeRecord: IRecladaObject | undefined;
  displaingType: DisplayingTypes;
  count: number;
  initList: () => void;
  setActiveRecord: (value: IRecladaObject | undefined) => void;
  setDisplaingType: (displaingType: DisplayingTypes) => void;
  setOrder: (order: RecladaOrder[] | undefined) => void;
  orders: RecladaOrder[] | undefined;
  listStore: BaseListStoreType;
}
type ObjectPaneProps = {
  service: IObjectServiceInterface;
};
export const ObjectPane: FC<ObjectPaneProps> = observer(function ObjectPane({ service }) {
  const handleUnselectDataset = useCallback(() => {
    service.setActiveRecord(undefined);
    //setSelectedDataset(undefined);
  }, [service]);

  useEffect(() => {
    service.initList();
  }, [service]);

  if (service.isError) {
    return (
      <Result
        status="error"
        subTitle={'Please, try again'}
        title={'Failed to load datasets'}
      />
    );
  }

  const content = null;

  return (
    <>
      <>
        <div className={style.toolbar}>{/* <ResultToolbar /> */}</div>
        <div className={style.main}>
          <div className={style.leftPanelWide}>
            {service.isLoading ? (
              <Spin
                size="large"
                style={{ position: 'absolute', width: '100%', height: '500px' }}
              />
            ) : (
              content
            )}
          </div>
          <Pager service={service.listStore} />
        </div>
      </>
    </>
  );
});
