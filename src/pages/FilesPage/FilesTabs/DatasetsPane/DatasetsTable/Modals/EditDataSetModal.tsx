import { Modal, Input, Form, Button, Row, Col } from 'antd';
import React, { FC } from 'react';

import { createDataset, updateDataset } from 'src/api/datasetsDataGateService';

type EditModalProps = {
  opened: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  dataSetId?: string;
  isCreationType: boolean;
  datasetId?: string;
  prevName?: string;
};

export const EditDataSetModal: FC<EditModalProps> = function EditModalRenderer({
  opened,
  handleOk,
  handleCancel,
  isCreationType,
  datasetId,
  prevName,
}) {
  const onFinish = (values: any) => {
    handleOk();
    isCreationType
      ? createDataset(values.name)
      : datasetId && updateDataset(values.name, datasetId);
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
          <Input defaultValue={prevName} />
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
