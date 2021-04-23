import { Progress } from 'antd';
import filesize from 'filesize';
import React, { FC } from 'react';

import { UploadFileInfo } from '../../../../../../utils/useUploadFiles';

import style from './UploadFileNameRenderer.module.scss';

type UploadFileNameRendererProps = {
  fileInfo: UploadFileInfo;
};

export const UploadFileNameRenderer: FC<UploadFileNameRendererProps> = function UploadFileNameRenderer({
  fileInfo,
}) {
  const isUploading = fileInfo.uploadStatus === 'uploading';
  const isSuccess = fileInfo.uploadStatus === 'success';

  return (
    <div className={style.fileNameWrapper}>
      <div className={style.fileNameRow}>
        <div className={style.fileName} title={fileInfo.name}>
          {fileInfo.name}
        </div>

        {isUploading && fileInfo.uploadProgress !== undefined ? (
          <div className={style.progressPercentage}>{fileInfo.uploadProgress}%</div>
        ) : null}
      </div>

      {isUploading && fileInfo.uploadProgress !== undefined ? (
        <Progress
          className={style.progressBar}
          percent={fileInfo.uploadProgress}
          showInfo={false}
          strokeColor={style.progressBarFilledColor}
          trailColor={style.progressBarUnfilledColor}
          type="line"
        />
      ) : isSuccess && fileInfo.size !== undefined ? (
        <div className={style.fileSize}>{filesize(fileInfo.size, { base: 10 })}</div>
      ) : null}
    </div>
  );
};
