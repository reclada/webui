import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import React, { FC, useRef } from 'react';

import style from '../DocumentViewer.module.scss';

import { SearchResultItem } from './SearchResultItem/SearchResultItem';
import { useContainerWidth } from './useContainerWidth';
import { usePdfjsPage } from './usePdfjsPage';
import { useSearchResults } from './useSearchResults';

type DocumentViewerPageProps = {
  pdfDocument: PDFDocumentProxy;
  pageNum: number;
  showSearchItems?: boolean;
};

export const DocumentViewerPage: FC<DocumentViewerPageProps> = function DocumentViewerPage({
  pdfDocument,
  pageNum,
  showSearchItems,
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(containerRef);

  const { isLoading, errorMessage, width, height } = usePdfjsPage({
    pdfDocument,
    pageNum,
    canvasRef,
    textLayerRef,
    containerWidth,
  });

  const items = useSearchResults({ pageNum, width, height });

  let content;

  if (errorMessage !== undefined) {
    content = <div>Error rendering page</div>;
  } else if (!isLoading && showSearchItems) {
    content = (
      <>
        {items.map(item => (
          <SearchResultItem key={item.id} item={item} />
        ))}
      </>
    );
  }

  return (
    <div ref={containerRef} className={style.root}>
      <canvas ref={canvasRef} style={{ width, height }} />
      <div ref={textLayerRef} className={style.textLayer} style={{ width, height }} />
      {content}
    </div>
  );
};
