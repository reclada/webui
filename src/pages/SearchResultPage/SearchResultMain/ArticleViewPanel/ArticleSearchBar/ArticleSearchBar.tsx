import React, { FC } from 'react';

import { ReactComponent as ArrowDown } from '../../../../../resources/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../../../../resources/arrow-up.svg';
import { Button } from '../../../../../shared/Button/Button';
import { classNames } from '../../../../../utils/classNames';

import style from './ArticleSearchBar.module.scss';
import { SearchTerm } from './SearchTerm/SearchTerm';

type ArticleSearchBarProps = {
  className?: string;
};

export const ArticleSearchBar: FC<ArticleSearchBarProps> = function ArticleSearchBar({
  className,
}) {
  return (
    <div className={classNames(className, style.root)}>
      {/* <div className={style.tagList}>
        <SearchTerm
          className={classNames(style.term, style.activeTag)}
          color="#EE7D87"
          count={7}
          title="target"
        />
        <SearchTerm className={style.term} color="#FFFFFF" count={44} title="neoplasm" />
        <SearchTerm className={style.term} color="#FFFFFF" count={44} title="neoplasm" />
        <SearchTerm className={style.term} color="#FFFFFF" count={44} title="neoplasm" />
        <SearchTerm className={style.term} color="#FFFFFF" count={44} title="neoplasm" />
        <SearchTerm className={style.term} color="#FFFFFF" count={44} title="neoplasm" />
        <SearchTerm
          className={style.term}
          color="#FFFFFF"
          count={2}
          title="lung adenocarcinoma"
        />
      </div> */}
      {/* <div className={style.activeSearch}>
        <div className={style.foundCounter}>1/8</div>
        <Button breed="icon" className={style.button}>
          <ArrowDown />
        </Button>
        <Button breed="icon">
          <ArrowUp />
        </Button>
      </div> */}
    </div>
  );
};
