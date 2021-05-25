import { Modal, Input, Form, Button, Row, Col } from 'antd';
import React, { FC } from 'react';

import { updateDataSource } from 'src/api/dataSourceDataGateService';

type EditModalProps = {
  opened: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  datasource: { id: string; checksum: string; mimeType: string };
  name: string;
};

export const EditDatasourceModal: FC<EditModalProps> = function EditDatasourceModal({
  opened,
  handleOk,
  handleCancel,
  datasource,
  name,
}) {
  const onFinish = (values: any) => {
    handleOk();
    updateDataSource(values.name, datasource);
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
          <Input defaultValue={name} />
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
