import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC, useCallback } from 'react';

import { UploadFile } from '../useUploadList';

import style from './UploadStatusRenderer.module.scss';

type UploadFileStatusRendererProps = {
  file: UploadFile;
  onUploadCancel: (fileId: string) => void;
};

export const UploadStatusRenderer: FC<UploadFileStatusRendererProps> = function UploadStatusRenderer({
  file,
  onUploadCancel,
}) {
  const handleUploadCancel = useCallback(() => {
    onUploadCancel(file.id);
  }, [onUploadCancel, file.id]);

  return (
    <div className={style.statusWrapper}>
      {file.uploadStatus === 'error' ? (
        <WarningOutlined className={style.iconError} />
      ) : file.uploadStatus === 'success' ? (
        <CheckCircleOutlined className={style.iconSuccess} />
      ) : file.uploadStatus === 'uploading' ? (
        <Button
          className={style.buttonCancel}
          icon={<CloseCircleOutlined className={style.iconCancel} />}
          shape="circle"
          type="link"
          onClick={handleUploadCancel}
        />
      ) : null}
    </div>
  );
};
