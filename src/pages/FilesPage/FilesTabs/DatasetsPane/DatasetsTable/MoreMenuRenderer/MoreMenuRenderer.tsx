import { Menu } from 'antd';
import React, { FC } from 'react';

import { useOpen } from 'src/utils/useOpen';

import { MoreDropdown } from '../../../../../../shared/MoreDropdown/MoreDropdown';
import { EditDataSetModal } from '../Modals/EditDataSetModal';

export type MoreMenuRendererProps = {
  dataSetId: string;
  prevName: string;
  onUpdate?: (name: string, datasetId: string) => void;
};

export const MoreMenuRenderer: FC<MoreMenuRendererProps> = function MoreMenuRenderer({
  dataSetId,
  prevName,
  onUpdate,
}) {
  const isEditModalOpen = useOpen(false);

  const moreMenu = (
    <Menu>
      <Menu.Item key={1}>
        <span>Version</span>
      </Menu.Item>
      <Menu.Item key={2} onClick={isEditModalOpen.open}>
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
        datasetId={dataSetId}
        handleCancel={isEditModalOpen.close}
        handleOk={() => {
          isEditModalOpen.close();
        }}
        isCreationType={false}
        opened={isEditModalOpen.isOpen}
        prevName={prevName}
        onUpdate={(name, datasetId) => onUpdate && onUpdate(name, datasetId)}
      />
    </Menu>
  );

  return <MoreDropdown menu={moreMenu} />;
};
