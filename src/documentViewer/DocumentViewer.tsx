import React, { FC, useRef } from 'react';

import style from './DocumentViewer.module.scss';
import { usePdfJs } from './usePdfjs';

export type DocumentViewerProps = {
  url: string;
};

export const DocumentViewer: FC<DocumentViewerProps> = function DocumentViewer({
  url,
}: DocumentViewerProps) {
  const canvasRef = useRef(null);
  const textLayerRef = useRef(null);

  const { height, width } = usePdfJs({
    url,
    canvasRef,
    textLayerRef,
  });

  return (
    <div className={style.root}>
      <canvas ref={canvasRef} className={style.canvas} />
      <div ref={textLayerRef} className={style.textLayer} style={{ height, width }} />
    </div>
  );
};
