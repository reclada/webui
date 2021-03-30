import React, { FC, useRef } from 'react';

import style from './DocumentViewer.module.scss';
import { SearchResultItem } from './SearchResultItem';
import { usePdfJs } from './usePdfjs';
import { useSearchResults } from './useSearchResults';

export type DocumentViewerProps = {
  url: string;
};

export const DocumentViewer: FC<DocumentViewerProps> = function DocumentViewer({
  url,
}: DocumentViewerProps) {
  const canvasRef = useRef(null);
  const textLayerRef = useRef(null);

  const { height, width, isTextRendered } = usePdfJs({
    url,
    canvasRef,
    textLayerRef,
  });

  const items = useSearchResults({ width, height });

  return (
    <div className={style.root}>
      <canvas ref={canvasRef} className={style.canvas} />
      <div ref={textLayerRef} className={style.textLayer} style={{ height, width }} />
      {isTextRendered &&
        items.map(item => <SearchResultItem key={item.id} item={item} />)}
    </div>
  );
};
