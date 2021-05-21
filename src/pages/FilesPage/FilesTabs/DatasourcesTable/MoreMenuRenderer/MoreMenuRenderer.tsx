import { Menu } from 'antd';
import React, { FC, useCallback } from 'react';

import { getDatasourceDownloadLink } from 'src/api/dataSourceDataGateService';
import { FilePreviewModal } from 'src/pages/FilesPage/FilesTabs/DatasourcesTable/FilePreviewModal/FilePreviewModal';
import { MoreDropdown } from 'src/shared/MoreDropdown/MoreDropdown';
import { downloadURI } from 'src/utils/downloadUri';
import { useOpen } from 'src/utils/useOpen';

export type MoreMenuRendererProps = {
  datasourceId: string;
  title: string;
};

export const MoreMenuRenderer: FC<MoreMenuRendererProps> = function MoreMenuRenderer({
  datasourceId,
  title,
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
      <Menu.Item key={3}>
        <span>Edit</span>
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
    </Menu>
  );

  return (
    <>
      <MoreDropdown menu={moreMenu} />
      <FilePreviewModal
        datasourceId={datasourceId}
        fileName={title}
        isOpen={filePreviewModal.isOpen}
        onClose={filePreviewModal.close}
      />
    </>
  );
};
