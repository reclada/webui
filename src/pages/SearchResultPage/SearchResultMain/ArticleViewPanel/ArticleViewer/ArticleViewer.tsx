import React, { FC } from 'react';

import { DocumentViewer } from 'src/shared/DocumentViewer/DocumentViewer';
import { classNames } from 'src/utils/classNames';

import style from './ArticleViewer.module.scss';

type ArticleViewerProps = {
  className?: string;
  documentUrl: string | undefined;
};

export const ArticleViewer: FC<ArticleViewerProps> = function ArticleViewer({
  className,
  documentUrl,
}) {
  return (
    <div className={classNames(className, style.root)}>
      {documentUrl !== undefined ? <DocumentViewer url={documentUrl} /> : null}
    </div>
  );
};
