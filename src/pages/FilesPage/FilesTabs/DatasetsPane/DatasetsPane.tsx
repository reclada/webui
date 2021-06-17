import { Result } from 'antd';
import React, { FC, useCallback, useEffect, useState } from 'react';

import { fetchDatasets, IDataset } from 'src/api/datasetsDataGateService';

import { DatasourcesTable } from '../DatasourcesTable/DatasourcesTable';

import { DatasetsPaneBreadcrumbs } from './DatasetsPaneBreadcrumbs/DatasetsPaneBreadcrumbs';
import { DatasetsTable } from './DatasetsTable/DatasetsTable';

export const DatasetsPane: FC = function DatasetsPane() {
  const [datasets, setDatasets] = useState<IDataset[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedDataset, setSelectedDataset] = useState<IDataset | undefined>(undefined);

  const handleUnselectDataset = useCallback(() => {
    setSelectedDataset(undefined);
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
        subTitle={
          errorMessage.includes('NoneType')
            ? 'You can create them right now'
            : 'Please, try again'
        }
        title={
          errorMessage.includes('NoneType')
            ? 'You have no datasets'
            : 'Failed to load datasets'
        }
      />
    );
  }

  return (
    <>
      {selectedDataset !== undefined ? (
        <>
          <DatasetsPaneBreadcrumbs
            selectedDataset={selectedDataset}
            onUnselectDataset={handleUnselectDataset}
          />
          <DatasourcesTable datasetId={selectedDataset.id} />
        </>
      ) : (
        <DatasetsTable
          datasets={datasets}
          isLoading={isLoading}
          onSelectDataset={setSelectedDataset}
          onUpdate={(name, datasetId) => {
            const newDataset = datasets?.find(dataset => dataset.id === datasetId);

            if (newDataset !== undefined) newDataset.title = name;

            if (datasets !== undefined) setDatasets([...datasets]);
          }}
        />
      )}
    </>
  );
};
