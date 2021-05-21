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
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isError) {
    return (
      <Result
        status="error"
        subTitle="Please, try again"
        title="Failed to load datasets"
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
        />
      )}
    </>
  );
};
