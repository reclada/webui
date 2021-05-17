import { Menu } from 'antd';
import React, { FC, useState } from 'react';

import { MoreDropdown } from '../../../../../../shared/MoreDropdown/MoreDropdown';
import { EditDataSetModal } from '../Modals/EditDataSetModal';

export type MoreMenuRendererProps = {
  dataSetId: string;
};

export const MoreMenuRenderer: FC<MoreMenuRendererProps> = function MoreMenuRenderer({
  dataSetId,
}) {
  const [isEditModalOpen, seIsEditModalOpen] = useState(false);

  const handleEditOk = () => {
    seIsEditModalOpen(false);
  };

  const handleEditCancel = () => {
    seIsEditModalOpen(false);
  };

  const moreMenu = (
    <Menu>
      <Menu.Item key={1}>
        <span>Version</span>
      </Menu.Item>
      <Menu.Item key={2} onClick={() => seIsEditModalOpen(true)}>
        <span>Edit</span>
      </Menu.Item>
      <Menu.Item key={3}>
        <span>Permissions</span>
      </Menu.Item>
      <Menu.Item key={4}>
        <span>Share</span>
      </Menu.Item>
      <Menu.Item key={5}>
        <span>Delete</span>
      </Menu.Item>
      <EditDataSetModal
        dataSetId={dataSetId}
        opened={isEditModalOpen}
        handleOk={handleEditOk}
        handleCancel={handleEditCancel}
      />
    </Menu>
  );

  return <MoreDropdown menu={moreMenu} />;
};
