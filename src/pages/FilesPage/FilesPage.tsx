import React from 'react';

import { ReactComponent as Logotype } from '../../resources/reclada.svg';
import { AccountMenu } from '../../shared/AccountMenu/AccountMenu';
import { SearchResultSidebar } from '../SearchResultPage/SearchResultSidebar/SearchResultSidebar';

import { FileSearch } from './FileSearch/FileSearch';
import style from './FilesPage.module.scss';
import { FilesTabs } from './FilesTabs/FilesTabs';

export const FilesPage: React.FC = function FilesPage() {
  return (
    <div className={style.root}>
      <span className={style.main}>
        <div className={style.search}>
          <div className={style.searchMain}>
            <Logotype />
            <FileSearch />
          </div>
          <AccountMenu className={style.accountMenu} />
        </div>
        <FilesTabs />
      </span>
      <SearchResultSidebar className={style.sidebar} />
    </div>
  );
};
