import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { GridLayout } from 'src/grid/GridLayout';
import { Header } from 'src/shared/Header/Header';
import { GridLayoutItem } from 'src/types/GridLayout';
import { eventEmitter } from 'src/utils/EventEmitter';

import { FileSearch } from './FileSearch/FileSearch';
import style from './FilesPage.module.scss';
import { DataSets } from './FilesTabs/Datasets/DataSets';
import { objectDataService } from './FilesTabs/ObjectPane/objectdata.service';
import { ObjectPane } from './FilesTabs/ObjectPane/ObjectPane';
// import { DatasourcesTable } from './FilesTabs/DatasourcesTable/DatasourcesTable';
// import { FilesTabsActions } from './FilesTabs/FilesTabsActions/FilesTabsActions';

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
  // const uploadDatasourceModal = useOpen();
  // const createDatasetModal = useOpen(false);
  // const handleDatasetCreate = useCallback(() => {
  //   createDatasetModal.open();
  // }, [createDatasetModal]);

  // const closeCreateDataSetModal = useCallback(() => {
  //   createDatasetModal.close();
  // }, [createDatasetModal]);

  // const NewContent = (
  //   <>
  //     <div className={style.actionBtn} onClick={uploadDatasourceModal.open}>
  //       Create File
  //     </div>
  //     <div className={style.actionBtn} onClick={handleDatasetCreate}>
  //       Create Data Set
  //     </div>
  //   </>
  // );

  return (
    <div className={style.root}>
      <Header />

      <div className={style.container}>
        <div className={style.main}>
          <div className={style.search}>
            <div className={style.searchMain}>
              <FileSearch />
              {/* <Popover content={NewContent}>
              <Button className={style.searchButton} size="l" variant="secondary">
                <PlusOutlined /> New
              </Button>
            </Popover> */}
            </div>
          </div>
          <div className={style.emptyContainer}></div>
          {/* <FilesTabsActions /> */}
          {pageType === FilePageType.Datasets && <DataSets />}
          {/* {pageType === FilePageType.Datasources && (
            <ObjectPane
              errorTitle="Failed to load files"
              selectable
              service={objectDataService}
            />
          )} */}
          {pageType === FilePageType.Assets ? 'Assets' : ''}
          {pageType === FilePageType.Available ? 'Available to me' : ''}
        </div>

        {/* <GridLayout layout={SidebarGrid} /> */}
      </div>

      {/* <EditDataSetModal
        handleCancel={closeCreateDataSetModal}
        handleOk={createDatasetModal.close}
        isCreationType={true}
        opened={createDatasetModal.isOpen}
      />
      <UploadDatasourceModal
        isOpen={uploadDatasourceModal.isOpen}
        onClose={uploadDatasourceModal.close}
      /> */}
    </div>
  );
};
