import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import React, { FC } from 'react';

import { UploadFileInfo } from '../../../../../../utils/useUploadFiles';

import style from './UploadFileStatusRenderer.module.scss';

type UploadFileStatusRendererProps = {
  fileInfo: UploadFileInfo;
};

export const UploadFileStatusRenderer: FC<UploadFileStatusRendererProps> = function UploadFileStatusRenderer({
  fileInfo,
}) {
  return (
    <div className={style.statusWrapper}>
      {fileInfo.uploadStatus === 'error' ? (
        <WarningOutlined className={style.iconError} />
      ) : fileInfo.uploadStatus === 'success' ? (
        <CheckCircleOutlined className={style.iconSuccess} />
      ) : null}
    </div>
  );
};
