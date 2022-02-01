import React from 'react';

import { SearchPanel } from '../../shared/SearchPanel/SearchPanel';
import { SearchResultSidebar } from '../SearchResultPage/SearchResultSidebar/SearchResultSidebar';

import style from './SearchPage.module.scss';

export const SearchPage: React.FC = function SearchPage() {
  return (
    <div className={style.root}>
      <SearchPanel />
      {/* <SearchResultSidebar className={style.sidebar} /> */}
    </div>
  );
};
