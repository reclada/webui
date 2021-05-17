import { Modal, Input, Form, Button, Row, Col } from 'antd';
import React, { FC } from 'react';

import { createDataset } from '../../../../../../api/datasetsDataGateService';

type EditModalProps = {
  opened: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  dataSetId?: string;
  isCreationType: boolean;
};

export const EditDataSetModal: FC<EditModalProps> = function EditModalRenderer({
  opened,
  handleOk,
  handleCancel,
  isCreationType,
}) {
  const onFinish = (values: any) => {
    handleOk();
    isCreationType ? createDataset(values.name) : createDataset(values.name);
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
        <Row>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
          <Col offset={4}>
            <Button type="ghost" onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
