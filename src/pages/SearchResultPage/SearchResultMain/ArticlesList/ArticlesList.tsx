import React, { FC } from 'react';

import { IArticle } from '../../../../api/articleService';

// import { articles } from './articles';
import style from './ArticlesList.module.scss';
import { ArticlesListItem } from './ArticlesListItem/ArticlesListItem';

type ArticlesListProps = {
  className?: string;
  articles: IArticle[] | null;
  setActiveArticleIndex: (index: number) => void;
};

export const ArticlesList: FC<ArticlesListProps> = function ArticlesList({
  className,
  articles,
  setActiveArticleIndex,
}) {
  return (
    <div className={style.root}>
      <ul className={style.ul}>
        {articles &&
          articles.map((article, index) => (
            <li
              key={index}
              className={style.li}
              onClick={() => setActiveArticleIndex(index)}
            >
              <ArticlesListItem article={article} />
            </li>
          ))}
      </ul>
    </div>
  );
};
