import { InboxOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, message } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import React, { FC, useState } from 'react';

import { createFileDataSource } from '../../api/dataSourceDataGateService';
import { fetchFilesList } from '../../api/datasourcesService';

import style from './FileUpload.module.scss';

const { Dragger } = Upload;

export const FileUpload: FC = function FileUpload() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const uploadFile = async (options: RcCustomRequestOptions) => {
    const { onSuccess, onError, file, onProgress, filename } = options;

    try {
      const res = await createFileDataSource(file as File);

      await fetchFilesList();

      if (onSuccess) {
        // todo correct implementation required
        // @ts-ignore
        onSuccess('Ok');
      }
      console.log('server res: ', res);
    } catch (err) {
      console.log('Error: ', err);

      if (onError) {
        // todo correct implementation required
        // @ts-ignore
        onError({ err });
      }
    }
  };

  const props = {
    name: 'file',
    accept: '.pdf,application/pdf',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      const { status } = info.file;

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Upload
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <div className={style.root}>
          <Dragger customRequest={uploadFile} {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        </div>
      </Modal>
    </>
  );
};
