import React, { FC } from 'react';

import { DocumentViewer } from '../../../../../documentViewer/DocumentViewer';
import { classNames } from '../../../../../utils/classNames';

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
