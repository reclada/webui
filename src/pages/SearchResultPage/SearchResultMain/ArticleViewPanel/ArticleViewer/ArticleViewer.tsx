import React, { FC, useEffect, useState } from 'react';
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/esm/entry.webpack';

import { ReactComponent as ArrowLeft } from '../../../../../resources/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../../../resources/arrow-right.svg';
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
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number | null }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    setPageNumber(1);
  }, [documentUrl]);

  const changePage = (diff: number) =>
    // TODO: !
    setPageNumber(
      pageNumber + diff <= 1
        ? 1
        : pageNumber + diff >= (numPages || 1)
        ? numPages || 1
        : pageNumber + diff
    );

  return (
    <div className={classNames(className, style.root)}>
      <Document
        className={style.documentArea}
        file={documentUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      {numPages && (
        <div className={style.controlPanel}>
          <button onClick={() => changePage(-1)}>
            <ArrowLeft />
          </button>
          Page {pageNumber} of {numPages}
          <button onClick={() => changePage(+1)}>
            <ArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};
