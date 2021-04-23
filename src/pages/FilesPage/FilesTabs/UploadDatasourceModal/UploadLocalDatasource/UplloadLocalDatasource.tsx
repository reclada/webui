import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, UploadProps } from 'antd';
import React, { FC, useCallback, useEffect, useRef } from 'react';

import { UploadFileInfo } from '../../../../../utils/useUploadFiles';
import { UploadFilesList } from '../UploadFilesList/UploadFilesList';

import style from './UploadLocalDatasource.module.scss';

const { Dragger } = Upload;

type UploadLocalDatasourceProps = {
  files: UploadFileInfo[];
  onUploadChange: (fileInfo: UploadFileInfo) => void;
};

export const UploadLocalDatasource: FC<UploadLocalDatasourceProps> = function UploadLocalDatasource({
  files,
  onUploadChange,
}) {
  const handleChange: UploadProps['onChange'] = useCallback(
    info => {
      const { uid: id, status, percent, name = 'File', size } = info.file;

      if (status === 'uploading') {
        onUploadChange({
          id,
          name,
          uploadStatus: 'uploading',
          uploadProgress: percent,
        });
      }

      if (status === 'done') {
        onUploadChange({
          id,
          name,
          uploadStatus: 'success',
          size,
        });
      }

      if (status === 'error') {
        onUploadChange({
          id,
          name,
          uploadStatus: 'error',
        });
      }
    },
    [onUploadChange]
  );

  const mockRequestTimerIdRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(mockRequestTimerIdRef.current);
  }, []);

  const handleUploadCancel = useCallback(
    (fileInfo: UploadFileInfo) => {
      onUploadChange({
        ...fileInfo,
        uploadStatus: 'cancelled',
      });

      clearTimeout(mockRequestTimerIdRef.current);
    },
    [onUploadChange]
  );

  const handleMockRequest: UploadProps['customRequest'] = options => {
    const progressTick = (curProgress: number) => {
      mockRequestTimerIdRef.current = (setTimeout(() => {
        if (curProgress >= 100) {
          options.onSuccess?.({}, new XMLHttpRequest());

          return;
        }

        options.onProgress?.({
          ...({} as ProgressEvent),
          percent: curProgress,
        });

        void progressTick(curProgress + 5);
      }, 200) as unknown) as number;
    };

    void progressTick(0);
  };

  return (
    <div>
      <Dragger
        accept=".pdf,.xls,.xlsx,.doc,.docx,.txt"
        action="/api/rpc/upload_datasource_file"
        className={style.dragger}
        customRequest={handleMockRequest}
        multiple={false}
        name="file"
        showUploadList={false}
        onChange={handleChange}
      >
        <CloudUploadOutlined className={style.uploadIcon} />

        <div className={style.uploadSupported}>
          Supported <strong>PDF, XLS, XLSX, DOC, DOCX and TXT</strong>
        </div>

        <div className={style.uploadDragDropDescription}>
          Drag & Drop your files here OR
        </div>

        <Button shape="round" size="large" type="primary">
          Browse files
        </Button>
      </Dragger>

      {files.length > 0 ? (
        <UploadFilesList files={files} onUploadCancel={handleUploadCancel} />
      ) : null}
    </div>
  );
};
