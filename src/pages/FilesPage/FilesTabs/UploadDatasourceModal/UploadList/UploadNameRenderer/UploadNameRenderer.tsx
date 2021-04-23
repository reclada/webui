import { Progress } from 'antd';
import filesize from 'filesize';
import React, { FC } from 'react';

import { UploadFile } from '../useUploadList';

import style from './UploadNameRenderer.module.scss';

type UploadFileNameRendererProps = {
  file: UploadFile;
};

export const UploadNameRenderer: FC<UploadFileNameRendererProps> = function UploadNameRenderer({
  file,
}) {
  const isUploading = file.uploadStatus === 'uploading';
  const isSuccess = file.uploadStatus === 'success';

  return (
    <div className={style.wrapper}>
      <div className={style.nameRow}>
        <div className={style.name} title={file.name}>
          {file.name}
        </div>

        {isUploading && file.uploadProgress !== undefined ? (
          <div className={style.progressPercentage}>{file.uploadProgress}%</div>
        ) : null}
      </div>

      {isUploading ? (
        <Progress
          className={style.progressBar}
          percent={file.uploadProgress ?? 0}
          showInfo={false}
          strokeColor={style.progressBarFilledColor}
          trailColor={style.progressBarUnfilledColor}
          type="line"
        />
      ) : null}

      {isSuccess && file.size !== undefined ? (
        <div className={style.size}>{filesize(file.size, { base: 10 })}</div>
      ) : null}
    </div>
  );
};
