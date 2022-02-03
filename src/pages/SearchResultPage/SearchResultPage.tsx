import React from 'react';

import { Header } from 'src/shared/Header/Header';

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
      <Header />

      <div className={style.container}>
        <SearchResultMain className={style.main} />
        {/* <SearchResultSidebar className={style.sidebar} /> */}
      </div>
    </div>
  );
};
