import React, { FC } from 'react';

import { IArticle } from '../../../../../api/articleService';

import style from './ArticleNameRenderer.module.scss';

type ArticleNameRendererProps = {
  article: IArticle;
};

export const ArticleNameRenderer: FC<ArticleNameRendererProps> = function ArticleNameRenderer({
  article,
}) {
  return (
    <>
      <div className={style.titleWrapper}>
        <div className={style.title}>{article.title}</div>
      </div>

      <ul className={style.dictionaries}>
        {article.dictionaries &&
          article.dictionaries.map((dict, idx) => (
            <li key={idx} className={style.dictionary}>
              #{dict}
            </li>
          ))}
      </ul>
    </>
  );
};
