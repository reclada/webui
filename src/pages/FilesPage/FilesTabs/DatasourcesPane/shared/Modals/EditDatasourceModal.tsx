import { Modal, Input, Form, Button, Row, Col, Typography, Divider } from 'antd';
import React, { FC } from 'react';

import { updateDataSource } from 'src/api/dataSourceDataGateService';

type EditModalProps = {
  opened: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  datasource: { GUID: string; checksum: string; mimeType: string };
  onUpdate: (name: string, dataSourceId: string) => void;
  name: string;
};

export const EditDatasourceModal: FC<EditModalProps> = function EditDatasourceModal({
  opened,
  handleOk,
  handleCancel,
  datasource,
  name,
  onUpdate,
}) {
  const onFinish = (values: any) => {
    handleOk();
    updateDataSource(values.name, datasource) && onUpdate(values.name, datasource.GUID);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal closeIcon={[]} footer={[]} visible={opened}>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Typography.Title level={4}>Edit Data Source</Typography.Title>

        <Divider />
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
              <Button htmlType="submit" type="primary">
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
