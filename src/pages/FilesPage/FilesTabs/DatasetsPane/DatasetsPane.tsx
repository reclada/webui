import { Result } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';
import style from 'src/pages/SearchResultPage/SearchResultMain/SearchResultMain.module.scss';
import {
  ResultToolbar,
  ToolbarContext,
} from 'src/pages/shared/ResultToolbar/ResultToolbar';
import { DisplayingTypes, OrderType } from 'src/Sorting';

import { DatasourcesTable } from '../DatasourcesTable/DatasourcesTable';

import { DatasetsCards } from './DatasetsCards/DatasetsCards';
import { datasetsDataService } from './datasetsData.service';
import { DatasetsPaneBreadcrumbs } from './DatasetsPaneBreadcrumbs/DatasetsPaneBreadcrumbs';
import { DatasetsTable } from './DatasetsTable/DatasetsTable';
import { DatasetsTableInfinity } from './DatasetsTableInfinity/DatasetsTableInfinity';

export const DatasetsPane: FC = observer(function DatasetsPane() {
  const handleUnselectDataset = useCallback(() => {
    datasetsDataService.setActiveRecord(undefined);
    //setSelectedDataset(undefined);
  }, []);

  const onSelect = useCallback((record: IDataset) => {
    datasetsDataService.setActiveRecord(record);
  }, []);

  useEffect(() => {
    datasetsDataService.updateDatasets();
  }, []);

  const service = {
    datasets: () => {
      return datasetsDataService.datasets ? datasetsDataService.datasets : [];
    },
    setOffset: async (value: number) => {
      await datasetsDataService.setOffset(value);
    },
    getOffsetValue: () => datasetsDataService.offsetValue,
    getElemNumber: () => datasetsDataService.elemNumber,
  };

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
      // <DatasetsTable
      //   datasets={datasetsDataService.datasets}
      //   isLoading={datasetsDataService.isLoading}
      //   onClickHeader={onClickHeader}
      //   onSelectDataset={onSelect}
      //   onUpdate={(name, datasetId) => {
      //     const newDataset = datasetsDataService.datasets?.find(
      //       dataset => dataset.id === datasetId
      //     );

      //     if (newDataset !== undefined) newDataset.title = name;

      //     //if (datasets !== undefined) setDatasets([...datasets]);
      //   }}
      // />
      <DatasetsTableInfinity
        service={service}
        onSelect={onSelect}
        onUpdate={(name, datasetId) => {
          const newDataset = datasetsDataService.datasets?.find(
            dataset => dataset.id === datasetId
          );

          if (newDataset !== undefined) newDataset.title = name;

          //if (datasets !== undefined) setDatasets([...datasets]);
        }}
      ></DatasetsTableInfinity>
    ) : (
      <DatasetsCards
        service={service}
        onSelect={onSelect}
        onUpdate={(name, datasetId) => {
          const newDataset = datasetsDataService.datasets?.find(
            dataset => dataset.id === datasetId
          );

          if (newDataset !== undefined) newDataset.title = name;

          if (datasetsDataService.datasets !== undefined)
            datasetsDataService.setDatasets([...datasetsDataService.datasets]);
        }}
      ></DatasetsCards>
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
          <div className={style.toolbar}>
            <ToolbarContext.Provider value={datasetsDataService}>
              <ResultToolbar />
            </ToolbarContext.Provider>
          </div>
          <div className={style.main}>
            <div className={style.leftPanelWide}>
              {datasetsDataService.isLoading ? null : content}
            </div>
          </div>
        </>
      )}
    </>
  );
});
