import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadProps } from 'antd';
import { nanoid } from 'nanoid/non-secure';
import React, { FC, useCallback } from 'react';

import { createFileDataSource } from '../../../../../api/dataSourceDataGateService';
import { UploadCancel, UploadListResult } from '../UploadList/useUploadList';

import style from './UploadLocalDatasource.module.scss';

const { Dragger } = Upload;

type UploadLocalDatasourceProps = {
  onSetFile: UploadListResult['setFile'];
  onSetUploadCancel: UploadListResult['setUploadCancel'];
};

export const UploadLocalDatasource: FC<UploadLocalDatasourceProps> = function UploadLocalDatasource({
  onSetFile,
  onSetUploadCancel,
}) {
  const handleRequest: UploadProps['customRequest'] = useCallback(
    options => {
      const fileId = nanoid();
      const file = options.file as File;

      onSetFile({
        id: fileId,
        name: file.name,
        uploadStatus: 'uploading',
        uploadProgress: 0,
      });

      createFileDataSource(file, {
        onProgress: (percent: number) => {
          onSetFile({
            id: fileId,
            name: file.name,
            uploadStatus: 'uploading',
            uploadProgress: percent,
          });
        },
        onSetCancel: (uploadCancel: UploadCancel) => {
          onSetUploadCancel(fileId, uploadCancel);
        },
      })
        .then(() => {
          onSetFile({
            id: fileId,
            name: file.name,
            size: file.size,
            uploadStatus: 'success',
          });
        })
        .catch(err => {
          if (err !== 'cancelled') {
            onSetFile({
              id: fileId,
              name: file.name,
              uploadStatus: 'error',
            });
          }
        });
    },
    [onSetFile, onSetUploadCancel]
  );

  return (
    <div>
      <Dragger
        accept=".pdf,application/pdf,.xlsx"
        className={style.dragger}
        customRequest={handleRequest}
        multiple={true}
        name="file"
        showUploadList={false}
      >
        <CloudUploadOutlined className={style.uploadIcon} />

        <div className={style.uploadSupported}>
          Supports <strong>PDF</strong> files
        </div>

        <div className={style.uploadDragDropDescription}>
          Drag & Drop your files here OR
        </div>

        <Button shape="round" size="large" type="primary">
          Browse files
        </Button>
      </Dragger>
    </div>
  );
};
