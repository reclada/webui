// eslint-disable-next-line import/no-extraneous-dependencies
import * as pdfjsLib from 'pdfjs-dist';
import React, { useEffect, useState } from 'react';

type usePdfJsArgs = {
  url: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  textLayerRef: React.RefObject<HTMLDivElement>;
};

export function usePdfJs({ url, canvasRef, textLayerRef }: usePdfJsArgs) {
  const [height, setHeight] = useState(800);
  const [width, setWidth] = useState(600);
  const [isTextRendered, setIsTextRendered] = useState(false);

  useEffect(() => {
    pdfjsLib.getDocument(url).promise.then(pdf => {
      console.log('PDF loaded');

      // Fetch the first page
      const pageNumber = 1;

      pdf.getPage(pageNumber).then(function (page) {
        console.log('Page loaded');

        const scale = 1.3;
        const viewport = page.getViewport({ scale: scale });

        const textLayer = textLayerRef.current!;

        setHeight(viewport.height);
        setWidth(viewport.width);

        page.getTextContent().then(textContent => {
          console.log('text content', textContent);
          // https://github.com/mozilla/pdf.js/blob/master/src/display/text_layer.js
          // @ts-ignore -- todo update type definitions
          pdfjsLib.renderTextLayer({
            textContent,
            container: textLayer,
            viewport,
            textDivs: [],
            textContentItemsStr: [],
            timeout: 100,
            enhanceTextSelection: false,
          });

          setIsTextRendered(true);
        });

        // Prepare canvas using PDF page dimensions
        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        const renderTask = page.render(renderContext);

        renderTask.promise.then(function () {
          console.log('Page rendered');
        });
      });
    });
  }, [url, canvasRef, textLayerRef]);

  return {
    height,
    width,
    isTextRendered,
  };
}
