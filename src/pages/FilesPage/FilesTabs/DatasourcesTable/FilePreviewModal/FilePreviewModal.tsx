import { Button, Divider, Modal, Typography } from 'antd';
import React, { FC } from 'react';

import { useFileUrl } from 'src/pages/FilesPage/FilesTabs/DatasourcesTable/FilePreviewModal/useFileUrl';
import { DocumentViewer } from 'src/shared/DocumentViewer/DocumentViewer';

import style from './FilePreviewModal.module.scss';

type FilePreviewModalProps = {
  fileName: string;
  datasourceId: string;
  isOpen: boolean;
  onClose: () => void;
};
export const FilePreviewModal: FC<FilePreviewModalProps> = function FilePreviewModal({
  fileName,
  datasourceId,
  isOpen,
  onClose,
}) {
  const url = useFileUrl(datasourceId);

  return (
    <Modal
      cancelText="Close"
      destroyOnClose={true}
      footer={
        <Button shape="round" size="large" type="primary" onClick={onClose}>
          Close
        </Button>
      }
      okText={null}
      visible={isOpen}
      width="800px"
      onCancel={onClose}
    >
      <Typography.Title level={4}>{fileName}</Typography.Title>

      <Divider />
      <div className={style.body}>
        {url && <DocumentViewer showSearchItems={true} url={url} />}
      </div>
    </Modal>
  );
};
