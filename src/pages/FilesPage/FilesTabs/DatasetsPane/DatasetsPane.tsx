import { Col, Divider, Result, Row, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect } from 'react';

import {
  ResultToolbar,
  ToolbarContext,
} from 'src/pages/shared/ResultToolbar/ResultToolbar';
import { InfiniteList } from 'src/shared/InfiniteList/InfiniteList';
import { DisplayingTypes } from 'src/stores/Types';

import { Pager } from '../../../shared/Pager/Pager';
import { DatasourcesPane } from '../DatasourcesPane/DatasourcesPane';

import { DatasetsCardsRow } from './DatasetsCardsRow/DatasetsCardsRow';
import { datasetsDataService } from './datasetsData.service';
import style from './DatasetsPane.module.scss';
import { DatasetsPaneBreadcrumbs } from './DatasetsPaneBreadcrumbs/DatasetsPaneBreadcrumbs';
import { DatasetsTableInfRow } from './DatasetsTableInfRow/DatasetsTableInfRow';

export const DatasetsPane: FC = observer(function DatasetsPane() {
  const handleUnselectDataset = useCallback(() => {
    datasetsDataService.setActiveRecord(undefined);
  }, []);

  const onClickHeader = (key: string) => {
    // const dk = datasetsDataService.orders?.filter(el => el.field === key);
    // if (dk && dk.length) {
    //   datasetsDataService.setOrder([
    //     {
    //       field: key,
    //       order: dk[0].order === OrderType.ASC ? OrderType.DESC : OrderType.ASC,
    //     },
    //   ]);
    // } else {
    //   datasetsDataService.setOrder([
    //     {
    //       field: key,
    //       order: OrderType.DESC,
    //     },
    //   ]);
    // }
  };

  useEffect(() => {
    datasetsDataService.initList();
  }, []);

  if (datasetsDataService.isError) {
    return (
      <Result
        status="error"
        subTitle={'Please, try again'}
        title={'Failed to load datasets'}
      />
    );
  }

  const content =
    datasetsDataService.displaingType === DisplayingTypes.TABLE ? (
      <>
        <div className={style.headTable}>
          <Row>
            <Col
              className={style.columnTable}
              span={3}
              onClick={() => onClickHeader('attrs, name')}
            >
              Name <Divider className={style.dividerHeader} type="vertical" />
            </Col>
            <Col span={4}>
              Create date <Divider className={style.dividerHeader} type="vertical" />
            </Col>
            <Col span={4}>
              Author <Divider className={style.dividerHeader} type="vertical" />
            </Col>
            <Col span={4}>
              Last update <Divider className={style.dividerHeader} type="vertical" />
            </Col>
            <Col span={4}>
              Who updated <Divider className={style.dividerHeader} type="vertical" />
            </Col>
            <Col span={4}>
              Owners <Divider className={style.dividerHeader} type="vertical" />
            </Col>
            <Col span={1}></Col>
          </Row>
        </div>
        <InfiniteList className={''} itemSize={55} rowCount={datasetsDataService.count}>
          {DatasetsTableInfRow}
        </InfiniteList>
      </>
    ) : (
      <InfiniteList
        className={''}
        itemSize={270}
        rowCount={
          datasetsDataService.count % 3 > 0
            ? Math.floor(datasetsDataService.count / 3) + 1
            : datasetsDataService.count / 3
        }
      >
        {DatasetsCardsRow}
      </InfiniteList>
    );

  return (
    <>
      {datasetsDataService.activeRecord !== undefined ? (
        <>
          <DatasetsPaneBreadcrumbs
            selectedDataset={datasetsDataService.activeRecord}
            onUnselectDataset={handleUnselectDataset}
          />
          <DatasourcesPane datasetId={datasetsDataService.activeRecord['{GUID}']} />
        </>
      ) : (
        <>
          <div className={style.toolbar}>
            <ToolbarContext.Provider value={datasetsDataService as any}>
              <ResultToolbar />
            </ToolbarContext.Provider>
          </div>
          <div className={style.main}>
            <div className={style.leftPanelWide}>
              {datasetsDataService.isLoading ? (
                <Spin
                  size="large"
                  style={{ position: 'absolute', width: '100%', height: '500px' }}
                />
              ) : (
                content
              )}
            </div>
            <Pager service={datasetsDataService.listStore as any} />
          </div>
        </>
      )}
    </>
  );
});
