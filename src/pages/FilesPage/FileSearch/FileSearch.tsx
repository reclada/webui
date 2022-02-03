import React from 'react';

import { Button } from '../../../shared/Button/Button';
import { SearchField } from '../../../shared/SearchField/SearchField';

import style from './FileSearch.module.scss';

export const FileSearch: React.FC = function FileSearch() {
  return (
    <div className={style.root}>
      <SearchField
        className={style.searchField}
        provideSearchData={() => {
          console.log('input');
        }}
      />
      <Button size="l">Search</Button>
    </div>
  );
};
