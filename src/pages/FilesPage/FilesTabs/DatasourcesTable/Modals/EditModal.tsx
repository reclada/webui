import { Modal, Input } from 'antd';
import React, { FC, useState } from 'react';

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
  return (
    <Modal visible={opened} onOk={handleOk} onCancel={handleCancel}>
      <p>Please input new name </p>
      <Input />
    </Modal>
  );
};
