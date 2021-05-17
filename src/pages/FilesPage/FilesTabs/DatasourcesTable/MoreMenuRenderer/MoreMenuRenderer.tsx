import { Menu } from 'antd';
import React, { FC, useCallback, useState } from 'react';

import {
  createDataSource,
  getDatasourceDownloadLink,
} from 'src/api/dataSourceDataGateService';
import { MoreDropdown } from 'src/shared/MoreDropdown/MoreDropdown';
import { downloadURI } from 'src/utils/downloadUri';

import { EditModal } from '../Modals/EditModal';
import {useOpen} from "../../../../../utils/useOpen";

export type MoreMenuRendererProps = {
  datasourceId: string;
};

export const MoreMenuRenderer: FC<MoreMenuRendererProps> = function MoreMenuRenderer({
  datasourceId,
}) {
  const downloadDatasource = useCallback(async () => {
    const link = await getDatasourceDownloadLink(datasourceId);

    const resp = await fetch(link, {
      method: 'GET',
    });
    const blob = await resp.blob();
    const obj = window.URL.createObjectURL(blob);

    downloadURI(obj, 'fileName.pdf');
    window.URL.revokeObjectURL(obj);
  }, [datasourceId]);

  const isEditModalOpen = useOpen(false);

  const handleEditOk = () => {
    createDataSource(datasourceId);
    isEditModalOpen.close;
  };

  const handleEditCancel = () => {
    isEditModalOpen.close;
  };

  const moreMenu = (
    <Menu>
      <Menu.Item key={0} onClick={downloadDatasource}>
        <span>Download</span>
      </Menu.Item>
      <Menu.Item key={1}>
        <span>Data set</span>
      </Menu.Item>
      <Menu.Item key={2}>
        <span>Version</span>
      </Menu.Item>
      <Menu.Item key={3} onClick={() => isEditModalOpen.open}>
        <span> Edit</span>
      </Menu.Item>
      <Menu.Item key={4}>
        <span>Permissions</span>
      </Menu.Item>
      <Menu.Item key={5}>
        <span>Share</span>
      </Menu.Item>
      <Menu.Item key={6}>
        <span>Delete</span>
      </Menu.Item>
      <EditModal
        opened={isEditModalOpen.isOpen}
        handleOk={handleEditOk}
        handleCancel={handleEditCancel}
      />
    </Menu>
  );

  return <MoreDropdown menu={moreMenu} />;
};
