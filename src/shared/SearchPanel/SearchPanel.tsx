import React, { FC, useCallback, useState } from 'react';

import { fetchArticles, IArticle } from '../../api/articleService';
import { classNames } from '../../utils/classNames';
import { Button } from '../Button/Button';
import { SearchField } from '../SearchField/SearchField';

import style from './SearchPanel.module.scss';

type SearchPanelProps = {
  className?: string;
  setSearchResults?: (searchResults: IArticle[]) => void;
};

export const SearchPanel: FC<SearchPanelProps> = function SearchPanel({
  className,
  setSearchResults,
}) {
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string | null>(null);
  const onSearch = useCallback(() => {
    window.location.hash = '/search?=test';

    currentSearchQuery &&
      fetchArticles(currentSearchQuery).then(data => {
        const articles = (data.Articles || []).map(article => {
          article.url = (article.url || '').replace(
            /s3:\/\/([^/]*)\//,
            window.location.pathname + 'media/'
          );

          if (!article.snippets.length) {
            article.snippets = [
              'Sample text',
              'Sample text',
              'Sample text',
              'Sample text',
            ];
          }

          return article;
        });

        setSearchResults && setSearchResults(articles);
      });
  }, [setSearchResults, currentSearchQuery]);

  return (
    <div className={classNames(className, style.root)}>
      <SearchField
        className={style.searchField}
        provideSearchData={setCurrentSearchQuery}
      />
      <Button className={style.searchButton} size="l" onClick={onSearch}>
        Search
      </Button>
    </div>
  );
};
