import { Modal, Input, Form, Button } from 'antd';
import React, { FC } from 'react';

import { createDataset } from '../../../../../../api/datasetsDataGateService';

type EditModalProps = {
  opened: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  dataSetId: string;
};

export const EditDataSetModal: FC<EditModalProps> = function EditModalRenderer({
  opened,
  handleOk,
  handleCancel,
}) {
  const onFinish = (values: any) => {
    handleOk();
    createDataset(values.name);
    console.log('Success:', values.name);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal visible={opened} footer={[]}>
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
        <Button type="primary" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </Modal>
  );
};
