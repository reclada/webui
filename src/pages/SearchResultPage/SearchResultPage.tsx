import React from 'react';

import { SearchResultMain } from './SearchResultMain/SearchResultMain';
import style from './SearchResultPage.module.scss';
import { SearchResultSidebar } from './SearchResultSidebar/SearchResultSidebar';

type SearchResultPageProps = {
  query: string;
};

export const SearchResultPage: React.FC<SearchResultPageProps> = function SearchResultPage({
  query,
}) {
  return (
    <div className={style.root}>
      <SearchResultMain className={style.main} />
      <SearchResultSidebar className={style.sidebar} />
    </div>
  );
};
