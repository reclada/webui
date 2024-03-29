import { Menu } from 'antd';
import React, { FC, useCallback } from 'react';

import { getDatasourceDownloadLink } from 'src/api/dataSourceDataGateService';
import { FilePreviewModal } from 'src/pages/FilesPage/FilesTabs/DatasourcesTable/FilePreviewModal/FilePreviewModal';
import { MoreDropdown } from 'src/shared/MoreDropdown/MoreDropdown';
import { downloadURI } from 'src/utils/downloadUri';
import { useOpen } from 'src/utils/useOpen';

import { EditDatasourceModal } from '../Modals/EditDatasourceModal';

export type MoreMenuRendererProps = {
  datasource: { id: string; name: string; checksum: string; mimeType: string };
  onUpdate?: (name: string, datasource: string) => void;
};

export const MoreMenuRenderer: FC<MoreMenuRendererProps> = function MoreMenuRenderer({
  datasource,
  onUpdate,
}) {
  const downloadDatasource = useCallback(async () => {
    const link = await getDatasourceDownloadLink(datasource.id);

    const resp = await fetch(link, {
      method: 'GET',
    });
    const blob = await resp.blob();
    const obj = window.URL.createObjectURL(blob);

    downloadURI(obj, datasource.name);
    window.URL.revokeObjectURL(obj);
  }, [datasource.id, datasource.name]);

  const isEditModalOpen = useOpen(false);

  const handleEditOk = () => {
    isEditModalOpen.close();
  };

  const handleEditCancel = () => {
    isEditModalOpen.close();
  };

  const filePreviewModal = useOpen();

  const moreMenu = (
    <Menu>
      <Menu.Item key={0} onClick={downloadDatasource}>
        <span>Download</span>
      </Menu.Item>
      <Menu.Item key={0} onClick={filePreviewModal.open}>
        <span>Preview</span>
      </Menu.Item>
      <Menu.Item key={1}>
        <span>Data set</span>
      </Menu.Item>
      <Menu.Item key={2}>
        <span>Version</span>
      </Menu.Item>
      <Menu.Item key={3} onClick={isEditModalOpen.open}>
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
      <EditDatasourceModal
        datasource={datasource}
        handleCancel={handleEditCancel}
        handleOk={handleEditOk}
        name={datasource.name}
        opened={isEditModalOpen.isOpen}
        onUpdate={(name, datasourceId) => onUpdate && onUpdate(name, datasourceId)}
      />
    </Menu>
  );

  return (
    <>
      <MoreDropdown menu={moreMenu} />
      <FilePreviewModal
        datasourceId={datasource.id}
        fileName={datasource.name}
        isOpen={filePreviewModal.isOpen}
        onClose={filePreviewModal.close}
      />
    </>
  );
};
