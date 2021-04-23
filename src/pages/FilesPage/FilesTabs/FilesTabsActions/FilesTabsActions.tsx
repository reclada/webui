import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC } from 'react';

import { useOpen } from '../../../../utils/useOpen';
import { UploadDatasourceModal } from '../UploadDatasourceModal/UploadDatasourceModal';

import style from './FilesTabsActions.module.scss';

export const FilesTabsActions: FC = function FilesTabsActions() {
  const uploadDatasourceModal = useOpen(false);

  return (
    <>
      <Button
        className={style.actionBtn}
        ghost={true}
        icon={<PlusOutlined style={{ fontSize: 14 }} />}
        shape="round"
        type="primary"
        onClick={uploadDatasourceModal.onOpen}
      >
        Data source
      </Button>

      <UploadDatasourceModal
        isOpen={uploadDatasourceModal.isOpen}
        onClose={uploadDatasourceModal.onClose}
      />
    </>
  );
};
