import { Menu } from 'antd';
import React, { FC } from 'react';

import { IRecladaDataset } from 'src/api/IRecladaObject';
import { useOpen } from 'src/utils/useOpen';

import { MoreDropdown } from '../../../../../../shared/MoreDropdown/MoreDropdown';
import { EditDataSetModal } from '../Modals/EditDataSetModal';

export type MoreMenuRendererProps = {
  className?: string;
  dataSet: IRecladaDataset;
  // dataSetId: string;
  // prevName: string;
  onUpdate?: (name: string) => void;
};

export const MoreMenuRenderer: FC<MoreMenuRendererProps> = function MoreMenuRenderer({
  className,
  dataSet,
  onUpdate,
}) {
  const isEditModalOpen = useOpen(false);

  const moreMenu = (
    <Menu theme="dark">
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
        datasetId={dataSet['{GUID}']}
        handleCancel={isEditModalOpen.close}
        handleOk={() => {
          isEditModalOpen.close();
        }}
        isCreationType={false}
        opened={isEditModalOpen.isOpen}
        prevName={dataSet['{attributes,name}']}
        onUpdate={(name, datasetId) => onUpdate && onUpdate(name)}
      />
    </Menu>
  );

  return <MoreDropdown className={className} menu={moreMenu} />;
};
