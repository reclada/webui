import { Tag } from 'antd';
import React, { FC } from 'react';

import { classNames } from 'src/utils/classNames';

import style from './ArticleNameRenderer.module.scss';

type ArticleNameRendererProps = {
  title: string;
  dictionaries?: string[];
  className?: string;
};

export const ArticleNameRenderer: FC<ArticleNameRendererProps> = function ArticleNameRenderer({
  title,
  dictionaries,
  className,
}) {
  return (
    <>
      <div className={classNames(className, style.titleWrapper)}>
        <div className={className ? className : style.title}>{title}</div>
      </div>

      <>{dictionaries && dictionaries.map((dict, idx) => <Tag key={idx}>#{dict}</Tag>)}</>
    </>
  );
};
