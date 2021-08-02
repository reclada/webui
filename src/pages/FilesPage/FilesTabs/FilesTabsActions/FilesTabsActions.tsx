import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';

import { AddDatasourceToDatasetModal } from 'src/pages/FilesPage/FilesTabs/AddDatasourceToDatasetModal/AddDatasourceToDatasetModal';
import { datasourceTableService } from 'src/pages/FilesPage/FilesTabs/DatasourcesTable/datasourceTable.service';
import { useOpen } from 'src/utils/useOpen';

import style from './FilesTabsActions.module.scss';

export const FilesTabsActions: FC = observer(function FilesTabsActions() {
  const addDatasourceToDatasetModal = useOpen();

  const selectedDataSources = datasourceTableService.selectedRows;

  const isSourcesSelected = Boolean(selectedDataSources.length);

  return (
    <div className={style.buttonContainer}>
      <Button
        className={style.actionBtn}
        disabled={!isSourcesSelected}
        ghost={true}
        shape="round"
        type="primary"
        onClick={addDatasourceToDatasetModal.open}
      >
        Add to dataset
      </Button>

      <AddDatasourceToDatasetModal
        isOpen={addDatasourceToDatasetModal.isOpen}
        selectedDataSources={selectedDataSources}
        onClose={addDatasourceToDatasetModal.close}
      />
    </div>
  );
});
