import { PlusOutlined } from '@ant-design/icons/lib';
import { Popover } from 'antd';
import React, { FC, useCallback } from 'react';

import { Button } from '../../shared/Button/Button';
import { useOpen } from '../../utils/useOpen';
import { SearchResultSidebar } from '../SearchResultPage/SearchResultSidebar/SearchResultSidebar';

import { FileSearch } from './FileSearch/FileSearch';
import style from './FilesPage.module.scss';
import { DatasetsPane } from './FilesTabs/DatasetsPane/DatasetsPane';
import { EditDataSetModal } from './FilesTabs/DatasetsPane/DatasetsTable/Modals/EditDataSetModal';
import { DatasourcesPane } from './FilesTabs/DatasourcesPane/DatasourcesPane';
// import { DatasourcesTable } from './FilesTabs/DatasourcesTable/DatasourcesTable';
// import { FilesTabsActions } from './FilesTabs/FilesTabsActions/FilesTabsActions';
import { UploadDatasourceModal } from './FilesTabs/UploadDatasourceModal/UploadDatasourceModal';

export enum FilePageType {
  Datasets = 'datasets',
  Datasources = 'datasources',
  Assets = 'assets',
  Available = 'available',
  ObjectDataset = 'objectDataSet',
}

type FilesPageProps = {
  pageType: FilePageType;
};

export const FilesPage: FC<FilesPageProps> = function FilesPage({ pageType }) {
  const uploadDatasourceModal = useOpen();
  const createDatasetModal = useOpen(false);
  const handleDatasetCreate = useCallback(() => {
    createDatasetModal.open();
  }, [createDatasetModal]);

  const closeCreateDataSetModal = useCallback(() => {
    createDatasetModal.close();
  }, [createDatasetModal]);

  const NewContent = (
    <>
      <div className={style.actionBtn} onClick={uploadDatasourceModal.open}>
        Create File
      </div>
      <div className={style.actionBtn} onClick={handleDatasetCreate}>
        Create Data Set
      </div>
    </>
  );

  return (
    <div className={style.root}>
      <div className={style.main}>
        <div className={style.search}>
          <div className={style.searchMain}>
            <FileSearch />
            <Popover content={NewContent}>
              <Button className={style.searchButton} size="l">
                <PlusOutlined /> New
              </Button>
            </Popover>
          </div>
        </div>
        <div className={style.emptyContainer}></div>
        {/* <FilesTabsActions /> */}
        {pageType === FilePageType.Datasets ? <DatasetsPane /> : ''}
        {/* {pageType === FilePageType.Datasources ? <DatasourcesTable /> : ''} */}
        {pageType === FilePageType.Datasources ? <DatasourcesPane /> : ''}
        {pageType === FilePageType.Assets ? 'Assets' : ''}
        {pageType === FilePageType.Available ? 'Available to me' : ''}
      </div>
      <SearchResultSidebar className={style.sidebar} />

      <EditDataSetModal
        handleCancel={closeCreateDataSetModal}
        handleOk={createDatasetModal.close}
        isCreationType={true}
        opened={createDatasetModal.isOpen}
      />
      <UploadDatasourceModal
        isOpen={uploadDatasourceModal.isOpen}
        onClose={uploadDatasourceModal.close}
      />
    </div>
  );
};
