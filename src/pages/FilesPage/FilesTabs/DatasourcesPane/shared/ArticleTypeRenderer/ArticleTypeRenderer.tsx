import React, { FC, memo } from 'react';

import { ArticleType } from 'src/api/articleService';

import style from './ArticleTypeRenderer.module.scss';

type ArticleTypeRendererProps = {
  articleType: ArticleType;
};

export const ArticleTypeRenderer: FC<ArticleTypeRendererProps> = memo(
  function ArticleTypeRenderer({ articleType }) {
    return <div className={style.type}>{articleType}</div>;
  }
);
