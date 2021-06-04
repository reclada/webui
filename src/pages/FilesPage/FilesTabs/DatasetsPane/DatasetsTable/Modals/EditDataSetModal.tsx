import { Modal, Input, Form, Button, Row, Col, Typography, Divider } from 'antd';
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
  onUpdate?: (name: string, datasetId: string) => void;
};

export const EditDataSetModal: FC<EditModalProps> = function EditModalRenderer({
  opened,
  handleOk,
  handleCancel,
  isCreationType,
  datasetId,
  prevName,
  onUpdate,
}) {
  const onFinish = (values: any) => {
    handleOk();
    isCreationType
      ? createDataset(values.name) && onUpdate && onUpdate(values.name, datasetId!)
      : datasetId &&
        updateDataset(values.name, datasetId) &&
        onUpdate &&
        onUpdate(values.name, datasetId);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal visible={opened} footer={[]} closeIcon={[]}>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Typography.Title level={4}>
          {isCreationType ? 'Create' : 'Edit'} Data Set
        </Typography.Title>

        <Divider />
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
