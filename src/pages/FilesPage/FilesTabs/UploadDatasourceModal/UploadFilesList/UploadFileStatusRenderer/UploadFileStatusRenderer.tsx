import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC, useCallback } from 'react';

import { UploadFileInfo } from '../../../../../../utils/useUploadFiles';

import style from './UploadFileStatusRenderer.module.scss';

type UploadFileStatusRendererProps = {
  fileInfo: UploadFileInfo;
  onUploadCancel: (fileInfo: UploadFileInfo) => void;
};

export const UploadFileStatusRenderer: FC<UploadFileStatusRendererProps> = function UploadFileStatusRenderer({
  fileInfo,
  onUploadCancel,
}) {
  const handleUploadCancel = useCallback(() => {
    onUploadCancel(fileInfo);
  }, [onUploadCancel, fileInfo]);

  return (
    <div className={style.statusWrapper}>
      {fileInfo.uploadStatus === 'error' ? (
        <WarningOutlined className={style.iconError} />
      ) : fileInfo.uploadStatus === 'success' ? (
        <CheckCircleOutlined className={style.iconSuccess} />
      ) : fileInfo.uploadStatus === 'uploading' ? (
        <Button
          className={style.buttonCancel}
          ghost={true}
          icon={<CloseCircleOutlined className={style.iconCancel} />}
          shape="circle"
          type="link"
          onClick={handleUploadCancel}
        />
      ) : null}
    </div>
  );
};
