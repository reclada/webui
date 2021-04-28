import { ArticleType } from 'api/articleService';
import React, { FC } from 'react';

import style from './ArticleTypeRenderer.module.scss';

type ArticleTypeRendererProps = {
  articleType: ArticleType;
};

export const ArticleTypeRenderer: FC<ArticleTypeRendererProps> = function ArticleTypeRenderer({
  articleType,
}) {
  return <div className={style.type}>{articleType}</div>;
};
