import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
// eslint-disable-next-line import/no-extraneous-dependencies
import ResizeObserver from 'rc-resize-observer';
import React, { FC, useCallback, useRef, useState } from 'react';

import { classNames } from 'src/utils/classNames';

import style from './DocumentViewerPage.module.scss';
import { SearchResultItem } from './SearchResultItem/SearchResultItem';
import { usePdfjsPage } from './usePdfjsPage';
import { useSearchResults } from './useSearchResults';

type DocumentViewerPageProps = {
  className?: string;
  pdfDocument: PDFDocumentProxy;
  pageNum: number;
  showSearchItems?: boolean;
};

export const DocumentViewerPage: FC<DocumentViewerPageProps> = function DocumentViewerPage({
  className,
  pdfDocument,
  pageNum,
  showSearchItems,
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(
    () => containerRef.current?.clientWidth ?? 0
  );
  const [containerHeight, setContainerHeight] = useState(
    () => containerRef.current?.clientHeight ?? 0
  );

  const onResize = useCallback((size: { width: number; height: number }) => {
    setContainerWidth(size.width);
    setContainerHeight(size.height);
  }, []);

  const { isLoading, errorMessage, width, height } = usePdfjsPage({
    pdfDocument,
    pageNum,
    canvasRef,
    textLayerRef,
    containerWidth,
    containerHeight,
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
    <ResizeObserver onResize={onResize}>
      <div ref={containerRef} className={classNames(style.root, className)}>
        <canvas ref={canvasRef} style={{ width, height }} />
        <div ref={textLayerRef} className={style.textLayer} style={{ width, height }} />
        {content}
      </div>
    </ResizeObserver>
  );
};
