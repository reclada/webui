import { Result } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useState } from 'react';

import { fetchDatasets, IDataset } from 'src/api/datasetsDataGateService';
import style from 'src/pages/SearchResultPage/SearchResultMain/SearchResultMain.module.scss';
import {
  ResultToolbar,
  ToolbarContext,
} from 'src/pages/shared/ResultToolbar/ResultToolbar';
import { DisplayingTypes } from 'src/Sorting';

import { DatasourcesTable } from '../DatasourcesTable/DatasourcesTable';

import { DatasetsCards } from './DatasetsCards/DatasetsCards';
import { datasetsDataService } from './datasetsData.service';
import { DatasetsPaneBreadcrumbs } from './DatasetsPaneBreadcrumbs/DatasetsPaneBreadcrumbs';
import { DatasetsTable } from './DatasetsTable/DatasetsTable';

export const DatasetsPane: FC = observer(function DatasetsPane() {
  const [datasets, setDatasets] = useState<IDataset[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //const [selectedDataset, setSelectedDataset] = useState<IDataset | undefined>(undefined);

  const handleUnselectDataset = useCallback(() => {
    datasetsDataService.setActiveRecord(undefined);
    //setSelectedDataset(undefined);
  }, []);

  const onSelect = useCallback((record: IDataset) => {
    datasetsDataService.setActiveRecord(record);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setDatasets(undefined);
    setIsError(false);

    fetchDatasets()
      .then(datasets => {
        setDatasets(datasets);
        setIsLoading(false);
      })
      .catch(res => {
        setIsError(true);
        setIsLoading(false);
        setErrorMessage(res);
      });
  }, []);

  if (isError) {
    return (
      <Result
        status="error"
        subTitle={'Please, try again'}
        title={'Failed to load datasets'}
      />
    );
  }

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
          {datasetsDataService.displaingType === DisplayingTypes.TABLE ? (
            <DatasetsTable
              datasets={datasets}
              isLoading={isLoading}
              onSelectDataset={onSelect}
              onUpdate={(name, datasetId) => {
                const newDataset = datasets?.find(dataset => dataset.id === datasetId);

                if (newDataset !== undefined) newDataset.title = name;

                if (datasets !== undefined) setDatasets([...datasets]);
              }}
            />
          ) : (
            <DatasetsCards
              datasets={datasets}
              onSelect={onSelect}
              onUpdate={(name, datasetId) => {
                const newDataset = datasets?.find(dataset => dataset.id === datasetId);

                if (newDataset !== undefined) newDataset.title = name;

                if (datasets !== undefined) setDatasets([...datasets]);
              }}
            ></DatasetsCards>
          )}
        </>
      )}
    </>
  );
});
