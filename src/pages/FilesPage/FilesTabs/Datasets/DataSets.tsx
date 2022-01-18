import { observer } from 'mobx-react-lite';
import React, { ReactElement, useCallback, useEffect } from 'react';

import { IRecladaDataset, RecladaObjectClass } from 'src/api/IRecladaObject';

import { DatasetsPaneBreadcrumbs } from '../DatasetsPane/DatasetsPaneBreadcrumbs/DatasetsPaneBreadcrumbs';
import { objectDataService, ObjectDataService } from '../ObjectPane/objectdata.service';
import { ObjectPane } from '../ObjectPane/ObjectPane';

const objectDataSetsService = new ObjectDataService(RecladaObjectClass.DataSet);

export const DataSets = observer(
  (): ReactElement => {
    const { activeRecord } = objectDataSetsService;

    const handleUnselectDataset = useCallback(
      () => objectDataSetsService.setActiveRecord(undefined),
      []
    );

    useEffect(() => {
      return () => objectDataService.setActiveRecord(undefined);
    }, [activeRecord]);

    if (activeRecord) {
      return (
        <>
          <DatasetsPaneBreadcrumbs
            selectedDataset={activeRecord as IRecladaDataset}
            onUnselectDataset={handleUnselectDataset}
          />
          <ObjectPane
            errorTitle="Failed to load files"
            selectable
            service={objectDataService}
          />
        </>
      );
    }

    return (
      <ObjectPane errorTitle="Failed to load datasets" service={objectDataSetsService} />
    );
  }
);
