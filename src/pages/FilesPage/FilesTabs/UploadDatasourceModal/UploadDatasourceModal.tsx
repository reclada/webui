import { Button, Divider, Modal, Typography } from 'antd';
import React, { FC, useMemo } from 'react';

import { useUploadFiles } from '../../../../utils/useUploadFiles';

import { UploadFilesList } from './UploadFilesList/UploadFilesList';
import { UploadLocalDatasource } from './UploadLocalDatasource/UplloadLocalDatasource';

type UploadDatasourceModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const UploadDatasourceModal: FC<UploadDatasourceModalProps> = function UploadDatasourceModal({
  isOpen,
  onClose,
}) {
  const [files, setFileInfo] = useUploadFiles([
    {
      id: '123',
      name: 'InProgress.csv',
      uploadProgress: 50,
      uploadStatus: 'uploading',
      size: 124 * 1000,
    },
    {
      id: '12345',
      name: 'Uploaded.pdf',
      uploadStatus: 'success',
      size: 56 * 1000,
    },
    {
      id: '1234567',
      name: 'Invalid.pdf',
      uploadStatus: 'error',
    },
    {
      id: '123456789',
      name:
        'VeryLongFileName-VeryLongFileName-VeryLongFileName-VeryLongFileName-VeryLongFileName.pdf',
      uploadStatus: 'uploading',
      uploadProgress: 95,
    },
  ]);

  const isUploading = useMemo(
    () => files.some(file => file.uploadStatus === 'uploading'),
    [files]
  );

  return (
    <Modal
      cancelButtonProps={{
        disabled: isUploading,
      }}
      cancelText="Close"
      destroyOnClose={true}
      footer={
        <Button
          disabled={isUploading}
          shape="round"
          size="large"
          type="primary"
          onClick={onClose}
        >
          Close
        </Button>
      }
      okText={null}
      visible={isOpen}
      onCancel={onClose}
    >
      <Typography.Title level={4}>Upload Data Source</Typography.Title>

      <Divider />

      <UploadLocalDatasource onChange={setFileInfo} />

      {files.length > 0 ? <UploadFilesList files={files} /> : null}
    </Modal>
  );
};
