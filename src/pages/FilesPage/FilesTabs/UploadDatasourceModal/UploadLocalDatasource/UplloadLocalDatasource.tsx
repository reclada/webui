import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadProps } from 'antd';
import React, { FC, useCallback, useEffect, useRef } from 'react';

import { UploadFileInfo } from '../../../../../utils/useUploadFiles';

import style from './UploadLocalDatasource.module.scss';

const { Dragger } = Upload;

type UploadLocalDatasourceProps = {
  onChange: (fileInfo: UploadFileInfo) => void;
};

export const UploadLocalDatasource: FC<UploadLocalDatasourceProps> = function UploadLocalDatasource({
  onChange,
}) {
  const handleChange: UploadProps['onChange'] = useCallback(
    info => {
      const { uid: id, status, percent, name = 'File', size } = info.file;

      if (status === 'uploading') {
        onChange({
          id,
          name,
          uploadStatus: 'uploading',
          uploadProgress: percent,
        });
      }

      if (status === 'done') {
        onChange({
          id,
          name,
          uploadStatus: 'success',
          size,
        });
      }

      if (status === 'error') {
        onChange({
          id,
          name,
          uploadStatus: 'error',
        });
      }
    },
    [onChange]
  );

  const mockRequestTimerIdRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(mockRequestTimerIdRef.current);
  }, []);

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
    <Dragger
      accept=".pdf,.csv,.xls,.xlsx,.doc,.docx,.txt"
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
  );
};
