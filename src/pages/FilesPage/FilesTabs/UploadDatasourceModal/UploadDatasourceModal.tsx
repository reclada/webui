import { Button, Divider, Modal, Typography } from 'antd';
import React, { FC, useMemo } from 'react';

import { UploadList } from './UploadList/UploadList';
import { UploadFile, useUploadList } from './UploadList/useUploadList';
import { UploadLocalDatasource } from './UploadLocalDatasource/UplloadLocalDatasource';

const mockUploadFiles: UploadFile[] = [
  {
    id: '12345',
    name: 'Valid.pdf',
    uploadStatus: 'success',
    size: 56 * 1000,
  },
  {
    id: '1234567',
    name: 'Invalid.pdf',
    uploadStatus: 'error',
  },
];

type UploadDatasourceModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const UploadDatasourceModal: FC<UploadDatasourceModalProps> = function UploadDatasourceModal({
  isOpen,
  onClose,
}) {
  const { files, setFile, setUploadCancel, uploadCancel } = useUploadList(
    mockUploadFiles
  );

  const isUploading = useMemo(
    () => files.some(file => file.uploadStatus === 'uploading'),
    [files]
  );

  const canCloseModal = !isUploading;

  return (
    <Modal
      cancelButtonProps={{ disabled: !canCloseModal }}
      cancelText="Close"
      closable={canCloseModal}
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
      maskClosable={canCloseModal}
      okText={null}
      visible={isOpen}
      onCancel={onClose}
    >
      <Typography.Title level={4}>Upload Data Source</Typography.Title>

      <Divider />

      <UploadLocalDatasource onSetFile={setFile} onSetUploadCancel={setUploadCancel} />

      {files.length > 0 ? (
        <UploadList files={files} onUploadCancel={uploadCancel} />
      ) : null}
    </Modal>
  );
};
