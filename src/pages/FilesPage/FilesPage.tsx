import React, { FC } from 'react';

import { SearchResultSidebar } from '../SearchResultPage/SearchResultSidebar/SearchResultSidebar';

import { FileSearch } from './FileSearch/FileSearch';
import style from './FilesPage.module.scss';
import { DatasetsPane } from './FilesTabs/DatasetsPane/DatasetsPane';
import { DatasourcesTable } from './FilesTabs/DatasourcesTable/DatasourcesTable';
import { FilesTabsActions } from './FilesTabs/FilesTabsActions/FilesTabsActions';

export enum FilePageType {
  Datasets = 'datasets',
  Datasources = 'datasources',
  Assets = 'assets',
  Available = 'available',
}

type FilesPageProps = {
  pageType: FilePageType;
};

export const FilesPage: FC<FilesPageProps> = function FilesPage({ pageType }) {
  return (
    <div className={style.root}>
      <div className={style.main}>
        <div className={style.search}>
          <div className={style.searchMain}>
            <FileSearch />
          </div>
        </div>
        <FilesTabsActions />
        {pageType === FilePageType.Datasets ? <DatasetsPane /> : ''}
        {pageType === FilePageType.Datasources ? <DatasourcesTable /> : ''}
        {pageType === FilePageType.Assets ? 'Assets' : ''}
        {pageType === FilePageType.Available ? 'Available to me' : ''}
      </div>
      <SearchResultSidebar className={style.sidebar} />
    </div>
  );
};
