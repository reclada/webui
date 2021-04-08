import React from 'react';

import { Navigation } from '../../shared/Navigation/Navigation';
import { SearchPanel } from '../../shared/SearchPanel/SearchPanel';

import style from './SearchPage.module.scss';

export const SearchPage: React.FC = function SearchPage() {
  return (
    <main className={style.root}>
      <Navigation />
      <div className={style.searchWrapper}>
        <SearchPanel />
      </div>
    </main>
  );
};
