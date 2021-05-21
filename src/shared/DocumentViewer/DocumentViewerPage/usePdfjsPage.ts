import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import { RefObject, useEffect, useState } from 'react';

export interface UsePdfjsPageParams {
  pdfDocument: PDFDocumentProxy;
  pageNum: number;
  canvasRef: RefObject<HTMLCanvasElement>;
  textLayerRef: RefObject<HTMLDivElement>;
  containerWidth: number;
  containerHeight: number;
}

export interface UsePdfjsPageResult {
  isLoading: boolean;
  errorMessage: string | undefined;
  width: number;
  height: number;
}

export function usePdfjsPage({
  pdfDocument,
  pageNum,
  canvasRef,
  textLayerRef,
  containerWidth,
  containerHeight,
}: UsePdfjsPageParams): UsePdfjsPageResult {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textLayer = textLayerRef.current;

    if (canvas === null || textLayer === null) {
      throw new Error('Canvas or textLayer is not ready');
    }

    let isCancelled = false;
    let cleanupCallbacks: (() => void)[] = [];

    (async function renderPage() {
      try {
        setIsLoading(true);

        const page = await pdfDocument.getPage(pageNum);

        cleanupCallbacks.push(() => page.cleanup());

        if (isCancelled) return;

        const textContent = await page.getTextContent();

        if (isCancelled) return;

        const unscaledViewport = page.getViewport({ scale: 1 });
        const scaleToFit = Math.min(
          containerWidth / unscaledViewport.width,
          containerHeight / unscaledViewport.height
        );
        const viewport = page.getViewport({ scale: scaleToFit });

        const renderCanvas = (): Promise<void> => {
          const context = canvas.getContext('2d');

          if (context === null) {
            throw new Error('Unable to get 2d canvas context');
          }

          const dpr = window.devicePixelRatio;

          canvas.height = viewport.height * dpr;
          canvas.width = viewport.width * dpr;

          context.scale(dpr, dpr);

          setWidth(viewport.width);
          setHeight(viewport.height);

          // Render PDF page into canvas context
          const renderTask = page.render({
            canvasContext: context,
            viewport: viewport,
          });

          cleanupCallbacks.push(() => {
            renderTask.cancel();
          });

          return renderTask.promise;
        };

        const renderTextLayer = (): Promise<void> => {
          const renderTask = pdfjsLib.renderTextLayer({
            textContent,
            container: textLayer,
            viewport,
            textDivs: [],
            textContentItemsStr: [],
            timeout: 100,
            enhanceTextSelection: false,
          });

          cleanupCallbacks.push(() => renderTask.cancel());

          return renderTask.promise;
        };

        await Promise.all([renderCanvas(), renderTextLayer()]);

        if (isCancelled) return;

        setErrorMessage(undefined);
        setIsLoading(false);
      } catch (reason: unknown) {
        if (isCancelled) return;

        setIsLoading(false);
        setErrorMessage(typeof reason === 'string' ? reason : 'Page error');
      }
    })();

    return () => {
      isCancelled = true;

      for (const cleanup of cleanupCallbacks) {
        cleanup();
      }
    };
  }, [pdfDocument, pageNum, canvasRef, textLayerRef, containerWidth, containerHeight]);

  return {
    isLoading,
    errorMessage,
    width,
    height,
  };
}
