import React, { FC } from 'react';

import { IArticle } from '../../../../api/articleService';
import { ReactComponent as DocIcon } from '../../../../resources/document-icon.svg';
import { ReactComponent as DownloadIcon } from '../../../../resources/download.svg';
import { ReactComponent as ResizeIcon } from '../../../../resources/resize.svg';
import { Button } from '../../../../shared/Button/Button';
import { classNames } from '../../../../utils/classNames';

import { ArticleSearchBar } from './ArticleSearchBar/ArticleSearchBar';
import { ArticleViewer } from './ArticleViewer/ArticleViewer';
import style from './ArticleViewPanel.module.scss';

type ArticleViewPanelProps = {
  className?: string;
  article: IArticle | null;
};

export const ArticleViewPanel: FC<ArticleViewPanelProps> = function ArticleViewPanel({
  className,
  article,
}) {
  return (
    <div className={classNames(className, style.root)}>
      <header className={style.header}>
        <div className={style.headerTitle}>
          <div className={style.titleIcon}>
            <DocIcon />
          </div>
          <div className={style.titleWrapper}>
            <h2 className={style.title}>{article?.title}</h2>
            {/*<div className={style.fileInfo}>*/}
            {/*  {article?.type && article.type.toUpperCase()} {article?.size} bytes*/}
            {/*</div>*/}
          </div>
        </div>
        <div className={style.headerTools}>
          <Button breed="icon" className={style.iconButton}>
            <ResizeIcon />
          </Button>
          <a className={style.iconButton} download href={article?.url}>
            <DownloadIcon />
          </a>
        </div>
      </header>

      <div className={style.searchWrapper}>
        <ArticleSearchBar />
      </div>

      <div className={style.articleWrapper}>
        <ArticleViewer documentUrl={article?.url} />
      </div>
    </div>
  );
};
