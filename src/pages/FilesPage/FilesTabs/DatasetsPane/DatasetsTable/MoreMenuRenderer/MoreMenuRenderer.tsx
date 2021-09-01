import { Menu } from 'antd';
import React, { FC } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';
import { useOpen } from 'src/utils/useOpen';

import { MoreDropdown } from '../../../../../../shared/MoreDropdown/MoreDropdown';
import { EditDataSetModal } from '../Modals/EditDataSetModal';

export type MoreMenuRendererProps = {
  datasetIndex: number;
  dataSet: IDataset;
  // dataSetId: string;
  // prevName: string;
  onUpdate?: (name: string, dataset: IDataset, datasetInde: number) => void;
};

export const MoreMenuRenderer: FC<MoreMenuRendererProps> = function MoreMenuRenderer({
  datasetIndex,
  dataSet,
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
        dataSetId={dataSet.id}
        datasetId={dataSet.id}
        handleCancel={isEditModalOpen.close}
        handleOk={() => {
          isEditModalOpen.close();
        }}
        isCreationType={false}
        opened={isEditModalOpen.isOpen}
        prevName={dataSet.title}
        onUpdate={(name, datasetId) => onUpdate && onUpdate(name, dataSet, datasetIndex)}
      />
    </Menu>
  );

  return <MoreDropdown menu={moreMenu} />;
};
