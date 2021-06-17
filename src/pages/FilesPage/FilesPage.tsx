import React from 'react';

import { UserBadge } from '../../shared/Navigation/UserBadge/UserBadge';
import { SearchResultSidebar } from '../SearchResultPage/SearchResultSidebar/SearchResultSidebar';

import { FileSearch } from './FileSearch/FileSearch';
import style from './FilesPage.module.scss';
import { FilesTabs } from './FilesTabs/FilesTabs';

export const FilesPage: React.FC = function FilesPage() {
  return (
    <div className={style.root}>
      <div className={style.main}>
        <div className={style.search}>
          <div className={style.searchMain}>
            <FileSearch />
          </div>
          <UserBadge />
        </div>
        <FilesTabs />
      </div>
      <SearchResultSidebar className={style.sidebar} />
    </div>
  );
};
