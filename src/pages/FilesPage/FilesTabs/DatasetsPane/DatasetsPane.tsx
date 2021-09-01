import { Affix, Col, Divider, Result, Row, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';
import styleTool from 'src/pages/SearchResultPage/SearchResultMain/SearchResultMain.module.scss';
import {
  ResultToolbar,
  ToolbarContext,
} from 'src/pages/shared/ResultToolbar/ResultToolbar';
import { InfiniteList } from 'src/shared/InfiniteList/InfiniteList';
import { DisplayingTypes, OrderType } from 'src/Sorting';

import { Pager } from '../../../shared/Pager/Pager';
import { DatasourcesTable } from '../DatasourcesTable/DatasourcesTable';

import { DatasetsCardsRow } from './DatasetsCards/DatasetsCardsRow/DatasetsCardsRow';
import { datasetsDataService } from './datasetsData.service';
import style from './DatasetsPane.module.scss';
import { DatasetsPaneBreadcrumbs } from './DatasetsPaneBreadcrumbs/DatasetsPaneBreadcrumbs';
import { DatasetsTableInfRow } from './DatasetsTableInfinity/DatasetsTableInfRow/DatasetsTableInfRow';

export const DatasetsPane: FC = observer(function DatasetsPane() {
  const handleUnselectDataset = useCallback(() => {
    datasetsDataService.setActiveRecord(undefined);
    //setSelectedDataset(undefined);
  }, []);

  const onClickHeader = (key: string) => {
    const dk = datasetsDataService.orders?.filter(el => el.field === key);

    if (dk && dk.length) {
      datasetsDataService.setOrder([
        {
          field: key,
          order: dk[0].order === OrderType.ASC ? OrderType.DESC : OrderType.ASC,
        },
      ]);
    } else {
      datasetsDataService.setOrder([
        {
          field: key,
          order: OrderType.DESC,
        },
      ]);
    }
  };

  const onSelect = useCallback((record: IDataset) => {
    datasetsDataService.setActiveRecord(record);
  }, []);

  useEffect(() => {
    datasetsDataService.listStore.initList();
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
        <InfiniteList
          className={''}
          itemSize={55}
          rowCount={datasetsDataService.listStore.count}
        >
          <DatasetsTableInfRow
            elemNumber={datasetsDataService.listStore.count}
            index={0}
            onSelect={onSelect}
            onUpdate={(name, dataSet, datasetIndex) => {
              dataSet.title = name;
              datasetsDataService.listStore.updateRow(datasetIndex, dataSet);
            }}
          />
        </InfiniteList>
      </>
    ) : (
      <InfiniteList
        className={''}
        itemSize={270}
        rowCount={
          datasetsDataService.listStore.count % 3 > 0
            ? Math.floor(datasetsDataService.listStore.count / 3) + 1
            : datasetsDataService.listStore.count / 3
        }
      >
        <DatasetsCardsRow
          index={0}
          onSelect={onSelect}
          onUpdate={(name, dataSet, datasetIndex) => {
            dataSet.title = name;
            datasetsDataService.listStore.updateRow(datasetIndex, dataSet);
          }}
        />
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
          <DatasourcesTable datasetId={datasetsDataService.activeRecord.id} />
        </>
      ) : (
        <>
          <div className={styleTool.toolbar}>
            <ToolbarContext.Provider value={datasetsDataService}>
              <ResultToolbar />
            </ToolbarContext.Provider>
          </div>
          <div className={styleTool.main}>
            <div className={styleTool.leftPanelWide}>
              {datasetsDataService.isLoading ? (
                <Spin
                  size="large"
                  style={{ position: 'absolute', width: '100%', height: '500px' }}
                />
              ) : (
                content
              )}
            </div>
            <Pager service={datasetsDataService.listStore} />
          </div>
        </>
      )}
    </>
  );
});
