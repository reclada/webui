import React, { FC } from 'react';

import { Tag } from 'src/shared/Tag/Tag';
import { classNames } from 'src/utils/classNames';

import style from './ArticleNameRenderer.module.scss';

type ArticleNameRendererProps = {
  title: string;
  dictionaries?: string[];
  className?: string;
};

export const ArticleNameRenderer: FC<ArticleNameRendererProps> = React.memo(
  function ArticleNameRenderer({ title, dictionaries, className }) {
    return (
      <>
        <div className={classNames(className, style.titleWrapper)}>
          <div className={className ? className : style.title}>{title}</div>
        </div>

        <>
          {dictionaries &&
            dictionaries.map((dict, idx) => (
              <Tag
                key={idx}
                className={style.tag}
                variant="outlined"
                onClick={event => event.stopPropagation()}
              >
                {dict}
              </Tag>
            ))}
        </>
      </>
    );
  }
);
