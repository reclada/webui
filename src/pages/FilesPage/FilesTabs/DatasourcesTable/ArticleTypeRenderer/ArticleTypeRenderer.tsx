import React, { FC } from 'react';

import { IArticle } from '../../../../../api/articleService';

import style from './ArticleTypeRenderer.module.scss';

type ArticleTypeRendererProps = {
  article: IArticle;
};

export const ArticleTypeRenderer: FC<ArticleTypeRendererProps> = function ArticleTypeRenderer({
  article,
}) {
  return <div className={style.type}>{article.type}</div>;
};
