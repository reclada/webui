import { Pagination } from 'antd';
import React, { FC, useEffect, useState } from 'react';

import style from './DocumentViewer.module.scss';
import { DocumentViewerPage } from './DocumentViewerPage/DocumentViewerPage';
import { usePdfjsDocument } from './usePdfjsDocument';

export type DocumentViewerProps = {
  url: string;
  showSearchItems?: boolean;
};

export const DocumentViewer: FC<DocumentViewerProps> = function DocumentViewer({
  url,
  showSearchItems,
}: DocumentViewerProps) {
  const [pageNum, setPageNum] = useState(1);
  const { pdfDocument, isLoading, errorMessage } = usePdfjsDocument(url);

  useEffect(() => {
    setPageNum(1);
  }, [pdfDocument]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (errorMessage !== undefined) {
    return <div>Error loading document</div>;
  } else if (pdfDocument === undefined) {
    return null;
  }

  return (
    <div className={style.root}>
      <DocumentViewerPage
        className={style.document}
        pageNum={pageNum}
        pdfDocument={pdfDocument}
        showSearchItems={showSearchItems}
      />

      <Pagination
        className={style.pagination}
        current={pageNum}
        hideOnSinglePage={true}
        pageSize={1}
        simple={true}
        total={pdfDocument.numPages}
        onChange={setPageNum}
      />
    </div>
  );
};
