import React, { FC } from 'react';

import { IArticle } from '../../../../../api/articleService';
import { ReactComponent as DictIcon } from '../../../../../resources/dictionaries.svg';
import { classNames } from '../../../../../utils/classNames';

import style from './ArticlesListItem.module.scss';

type ArticlesListItemProps = {
  className?: string;
  article: IArticle;
};

export const ArticlesListItem: FC<ArticlesListItemProps> = function ArticlesListItem({
  className,
  article,
}) {
  return (
    <div className={classNames(className, style.root)} role="tab" tabIndex={0}>
      <header className={style.header}>
        <div className={style.titleWrapper}>
          {/*<div className={style.type}>{article.type && article.type.toUpperCase()}</div>*/}
          <div className={style.title}>{article.title}</div>
        </div>
      </header>
      <section>
        {article.snippets &&
          article.snippets.map(snippet => (
            <div dangerouslySetInnerHTML={{ __html: snippet }} />
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

        {/*<ul className={style.dictionaries}>*/}
        {/*  <DictIcon className={style.dictionaryIcon} />*/}
        {/*  {article.dictionaries &&*/}
        {/*    article.dictionaries.map(dict => (*/}
        {/*      <li className={style.dictionary}>{dict}</li>*/}
        {/*    ))}*/}
        {/*</ul>*/}

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
