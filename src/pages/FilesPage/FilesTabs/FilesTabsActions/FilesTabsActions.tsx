import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC, useCallback } from 'react';
import { createDataset } from 'src/api/datasetsDataGateService';
import { useOpen } from 'src/utils/useOpen';

import { UploadDatasourceModal } from '../UploadDatasourceModal/UploadDatasourceModal';

import style from './FilesTabsActions.module.scss';

export const FilesTabsActions: FC = function FilesTabsActions() {
  const uploadDatasourceModal = useOpen(false);

  const handleDatasetCreate = useCallback(() => {
    createDataset('test-test');
  }, []);

  return (
    <>
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

      <UploadDatasourceModal
        isOpen={uploadDatasourceModal.isOpen}
        onClose={uploadDatasourceModal.close}
      />
    </>
  );
};
