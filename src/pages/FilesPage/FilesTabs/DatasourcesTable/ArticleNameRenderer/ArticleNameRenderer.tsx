import { Tag } from 'antd';
import React, { FC } from 'react';

import style from './ArticleNameRenderer.module.scss';

type ArticleNameRendererProps = {
  title: string;
  dictionaries?: string[];
};

export const ArticleNameRenderer: FC<ArticleNameRendererProps> = function ArticleNameRenderer({
  title,
  dictionaries,
}) {
  return (
    <>
      <div className={style.titleWrapper}>
        <div className={style.title}>{title}</div>
      </div>

      <>{dictionaries && dictionaries.map((dict, idx) => <Tag key={idx}>#{dict}</Tag>)}</>
    </>
  );
};
