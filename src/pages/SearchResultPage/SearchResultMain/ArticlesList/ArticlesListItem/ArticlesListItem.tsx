import React, { FC } from 'react';

import { IArticle } from '../../../../../api/articleService';
import { ReactComponent as DictIcon } from '../../../../../resources/dictionaries.svg';
import { classNames } from '../../../../../utils/classNames';

import style from './ArticlesListItem.module.scss';

type ArticlesListItemProps = {
  className?: string;
  article: IArticle;
  isMinimized?: boolean;
};

export const ArticlesListItem: FC<ArticlesListItemProps> = function ArticlesListItem({
  className,
  article,
  isMinimized,
}) {
  return (
    <div
      className={classNames(
        className,
        style.root,
        isMinimized ? style.minimized : style.bigroot
      )}
      role="tab"
      tabIndex={0}
    >
      <header className={classNames(style.header, isMinimized ? style.smallHeader : '')}>
        {article.type && <div className={style.type}>{article.type}</div>}
        <div className={style.titleWrapper}>
          {/*<div className={style.type}>{article.type && article.type.toUpperCase()}</div>*/}
          <div className={style.title}>{article.title}</div>
        </div>
      </header>
      <section className={style.snippets}>
        {article.snippets &&
          article.snippets.map((snippet, idx) => (
            <div
              key={idx}
              className={style.snippet}
              dangerouslySetInnerHTML={{ __html: snippet }}
            />
          ))}

        {/*<ul className={style.searchTerms}>*/}
        {/*  <li className={style.searchTerm}>*/}
        {/*    target<span>4</span>*/}
        {/*  </li>*/}
        {/*  <li className={style.searchTerm}>*/}
        {/*    neoplasm<span>1</span>*/}
        {/*  </li>*/}
        {/*  <li className={style.searchTerm}>*/}
        {/*    lung<span>2</span>*/}
        {/*  </li>*/}
        {/*</ul>*/}

        <ul className={style.dictionaries}>
          {article.dictionaries &&
            article.dictionaries.map((dict, idx) => (
              <li key={idx} className={style.dictionary}>
                #{dict}
              </li>
            ))}
        </ul>

        {/*{article.snippets.map((snippet, key) => (*/}
        {/*  <div key={key} className={style.paragraphWrapper}>*/}
        {/*    <div>...</div>*/}
        {/*    <p className={style.paragraph}>*/}
        {/*      {snippet.map((txt, ind) => {*/}
        {/*        if (typeof txt === 'string') {*/}
        {/*          return <span key={ind}>{txt}</span>;*/}
        {/*        }*/}

        {/*        return (*/}
        {/*          <span key={ind} style={{ backgroundColor: txt.color }}>*/}
        {/*            {txt.text}*/}
        {/*          </span>*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*))}*/}
      </section>
    </div>
  );
};
