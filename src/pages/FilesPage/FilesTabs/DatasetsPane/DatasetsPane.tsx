import { Col, Divider, Result, Row } from 'antd';
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

import { DatasourcesTable } from '../DatasourcesTable/DatasourcesTable';

import { DatasetsCards } from './DatasetsCards/DatasetsCards';
import { DatasetsCardsRow } from './DatasetsCards/DatasetsCardsRow/DatasetsCardsRow';
import { datasetsDataService } from './datasetsData.service';
import style from './DatasetsPane.module.scss';
import { DatasetsPaneBreadcrumbs } from './DatasetsPaneBreadcrumbs/DatasetsPaneBreadcrumbs';
import { DatasetsTable } from './DatasetsTable/DatasetsTable';
import { DatasetsTableInfinity } from './DatasetsTableInfinity/DatasetsTableInfinity';
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
    datasetsDataService.updateDatasets();
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
          prepareNewPage={(index: number) => datasetsDataService.prepareNewPage(index)}
          rowCount={datasetsDataService.elemNumber}
        >
          <DatasetsTableInfRow
            elemNumber={datasetsDataService.elemNumber}
            getRowByIndex={(index: number) => {
              return datasetsDataService.getRowByIndex(
                index - datasetsDataService.offsetValue
              );
            }}
            index={0}
            isLoading={false}
            onSelect={onSelect}
            onUpdate={(name, datasetId) => {
              const newDataset = datasetsDataService.datasets?.find(
                dataset => dataset.id === datasetId
              );

              if (newDataset !== undefined) newDataset.title = name;

              if (datasetsDataService.datasets !== undefined)
                datasetsDataService.setDatasets([...datasetsDataService.datasets]);
            }}
          />
        </InfiniteList>
      </>
    ) : (
      <InfiniteList
        className={''}
        itemSize={270}
        prepareNewPage={(index: number) => datasetsDataService.prepareNewPage(index * 3)}
        rowCount={
          datasetsDataService.elemNumber % 3 > 0
            ? Math.floor(datasetsDataService.elemNumber / 3) + 1
            : datasetsDataService.elemNumber / 3
        }
      >
        <DatasetsCardsRow
          elemNumber={datasetsDataService.elemNumber}
          getRowByIndex={(index: number) => {
            return datasetsDataService.getRowByIndex(
              index - datasetsDataService.offsetValue
            );
          }}
          index={0}
          isLoading={false}
          onSelect={onSelect}
          onUpdate={(name, datasetId) => {
            const newDataset = datasetsDataService.datasets?.find(
              dataset => dataset.id === datasetId
            );

            if (newDataset !== undefined) newDataset.title = name;

            if (datasetsDataService.datasets !== undefined)
              datasetsDataService.setDatasets([...datasetsDataService.datasets]);
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
              {datasetsDataService.isLoading ? null : content}
            </div>
          </div>
        </>
      )}
    </>
  );
});
