import { Modal, Input, Form, Button } from 'antd';
import React, { FC } from 'react';

import { createDataSource } from '../../../../../api/dataSourceDataGateService';

type EditModalProps = {
  opened: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

export const EditModal: FC<EditModalProps> = function EditModalRenderer({
  opened,
  handleOk,
  handleCancel,
}) {
  const onFinish = (values: any) => {
    handleOk();
    createDataSource(values.name);
    console.log('Success:', values.name);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal visible={opened} footer={[]} closeIcon={[]}>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <p>Please input new name </p>
        <Form.Item
          label=""
          name="name"
          rules={[{ required: true, message: 'Please input datasetName!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Button type="ghost" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </Modal>
  );
};
