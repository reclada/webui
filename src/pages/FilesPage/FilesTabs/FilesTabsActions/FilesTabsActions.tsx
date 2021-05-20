import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';

import { AddDatasourceToDatasetModal } from 'src/pages/FilesPage/FilesTabs/AddDatasourceToDatasetModal/AddDatasourceToDatasetModal';
import { datasourceTableService } from 'src/pages/FilesPage/FilesTabs/DatasourcesTable/datasourceTable.service';
import { useOpen } from 'src/utils/useOpen';

import { EditDataSetModal } from '../DatasetsPane/DatasetsTable/Modals/EditDataSetModal';
import { UploadDatasourceModal } from '../UploadDatasourceModal/UploadDatasourceModal';

import style from './FilesTabsActions.module.scss';

export const FilesTabsActions: FC = observer(function FilesTabsActions() {
  const uploadDatasourceModal = useOpen();
  const addDatasourceToDatasetModal = useOpen();
  const createDatasetModal = useOpen(false);

  const selectedDataSources = datasourceTableService.selectedRows;

  const isSourcesSelected = Boolean(selectedDataSources.length);

  const handleDatasetCreate = useCallback(() => {
    createDatasetModal.open();
  }, [createDatasetModal]);

  const closeCreateDataSetModal = useCallback(() => {
    createDatasetModal.close();
  }, [createDatasetModal]);

  return (
    <>
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
      <Button
        className={style.actionBtn}
        ghost={true}
        icon={<PlusOutlined style={{ fontSize: 14 }} />}
        shape="round"
        type="primary"
        onClick={uploadDatasourceModal.open}
      >
        Data Source
      </Button>
      <Button
        className={style.actionBtn}
        ghost={true}
        icon={<PlusOutlined style={{ fontSize: 14 }} />}
        shape="round"
        type="primary"
        onClick={handleDatasetCreate}
      >
        Data Set
      </Button>

      <UploadDatasourceModal
        isOpen={uploadDatasourceModal.isOpen}
        onClose={uploadDatasourceModal.close}
      />

      <AddDatasourceToDatasetModal
        isOpen={addDatasourceToDatasetModal.isOpen}
        selectedDataSources={selectedDataSources}
        onClose={addDatasourceToDatasetModal.close}
      />
      <EditDataSetModal
        opened={createDatasetModal.isOpen}
        isCreationType={true}
        handleCancel={closeCreateDataSetModal}
        handleOk={createDatasetModal.close}
      />
    </>
  );
});
