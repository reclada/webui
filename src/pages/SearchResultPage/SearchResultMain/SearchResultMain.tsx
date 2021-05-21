import React, { FC, useMemo, useState } from 'react';

import { IArticle } from '../../../api/articleService';
import { ReactComponent as BigLogo } from '../../../resources/biglogo.svg';
import { ReactComponent as Logotype } from '../../../resources/reclada.svg';
import { AccountMenu } from '../../../shared/AccountMenu/AccountMenu';
import { SearchPanel } from '../../../shared/SearchPanel/SearchPanel';
import { classNames } from '../../../utils/classNames';

import { ArticlesList } from './ArticlesList/ArticlesList';
import { ArticleViewPanel } from './ArticleViewPanel/ArticleViewPanel';
import { ResultTabs } from './ResultTabs/ResultTabs';
import { ResultToolbar } from './ResultToolbar/ResultToolbar';
import style from './SearchResultMain.module.scss';

type SearchResultMainProps = {
  className: string;
};

export const SearchResultMain: FC<SearchResultMainProps> = function SearchResultMain({
  className,
}) {
  const [searchResults, setSearchResults] = useState<IArticle[] | null>(null);
  const [activeArticleIndex, setActiveArticleIndex] = useState<null | number>(null);

  const activeArticle = useMemo(() => {
    return (
      searchResults && activeArticleIndex !== null && searchResults[activeArticleIndex]
    );
  }, [activeArticleIndex, searchResults]);

  return (
    <div className={classNames(className, style.root)}>
      <header className={style.header}>{!searchResults && <BigLogo />}</header>
      <div className={style.search}>
        {searchResults && <Logotype />}
        <SearchPanel className={style.searchPanel} setSearchResults={setSearchResults} />
        <AccountMenu className={style.accountMenu} />
      </div>
      {searchResults && (
        <>
          <div className={style.resultTabs}>
            <ResultTabs />
          </div>
          <div className={style.toolbar}>
            <ResultToolbar />
          </div>

          <div className={style.main}>
            <div className={activeArticle ? style.leftPanelSlim : style.leftPanelWide}>
              <ArticlesList
                articles={searchResults}
                setActiveArticleIndex={setActiveArticleIndex}
              />
            </div>
            {activeArticle && (
              <div className={style.rightPanel}>
                <ArticleViewPanel article={activeArticle} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
