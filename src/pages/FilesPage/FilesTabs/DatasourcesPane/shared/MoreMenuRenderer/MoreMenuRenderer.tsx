import { Menu } from 'antd';
import React, { FC, useCallback } from 'react';

import { getDatasourceDownloadLink } from 'src/api/dataSourceDataGateService';
import { MoreDropdown } from 'src/shared/MoreDropdown/MoreDropdown';
import { downloadURI } from 'src/utils/downloadUri';
import { eventEmitter } from 'src/utils/EventEmitter';
import { useOpen } from 'src/utils/useOpen';

import { EditDatasourceModal } from '../Modals/EditDatasourceModal';

export type MoreMenuRendererProps = {
  className?: string;
  datasource: {
    '{GUID}': string;
    '{attributes,name}': string;
    '{checksum}': string;
    '{attributes,mimeType}': string;
  };
  onUpdate?: (name: string, datasourceId: string) => void;
};

export const MoreMenuRenderer: FC<MoreMenuRendererProps> = function MoreMenuRenderer({
  className,
  datasource,
  onUpdate,
}) {
  const downloadDatasource = useCallback(async () => {
    const link = await getDatasourceDownloadLink(datasource['{GUID}']);

    const resp = await fetch(link, {
      method: 'GET',
    });
    const blob = await resp.blob();
    const obj = window.URL.createObjectURL(blob);

    downloadURI(obj, datasource['{attributes,name}']);
    window.URL.revokeObjectURL(obj);
  }, [datasource]);

  const isEditModalOpen = useOpen(false);

  const handleEditOk = () => {
    isEditModalOpen.close();
  };

  const handleEditCancel = () => {
    isEditModalOpen.close();
  };

  const moreMenu = (
    <Menu theme="dark">
      <Menu.Item key={0} onClick={downloadDatasource}>
        <span>Download</span>
      </Menu.Item>
      <Menu.Item
        key={1}
        onClick={() => {
          datasource &&
            eventEmitter.emit('PREVIEW', {
              '{GUID}': datasource?.['{GUID}'],
              '{attributes,name}': datasource?.['{attributes,name}'],
            });
        }}
      >
        <span>Preview</span>
      </Menu.Item>
      <Menu.Item key={2}>
        <span>Data set</span>
      </Menu.Item>
      <Menu.Item key={3}>
        <span>Version</span>
      </Menu.Item>
      <Menu.Item key={4} onClick={isEditModalOpen.open}>
        <span> Edit</span>
      </Menu.Item>
      <Menu.Item key={5}>
        <span>Permissions</span>
      </Menu.Item>
      <Menu.Item key={6}>
        <span>Share</span>
      </Menu.Item>
      <Menu.Item key={7}>
        <span>Delete</span>
      </Menu.Item>
      <EditDatasourceModal
        datasource={datasource}
        handleCancel={handleEditCancel}
        handleOk={handleEditOk}
        name={datasource['{attributes,name}']}
        opened={isEditModalOpen.isOpen}
        onUpdate={(name, datasourceId) => onUpdate && onUpdate(name, datasourceId)}
      />
    </Menu>
  );

  return (
    <div className={className}>
      <MoreDropdown menu={moreMenu} />
    </div>
  );
};
