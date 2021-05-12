// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import pdfjsWorker from 'file-loader!pdfjs-dist/build/pdf.worker';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import { useEffect, useState } from 'react';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export interface UsePdfjsDocumentResult {
  isLoading: boolean;
  errorMessage: string | undefined;
  pdfDocument: PDFDocumentProxy | undefined;
}

export function usePdfjsDocument(url: string): UsePdfjsDocumentResult {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | undefined>();

  useEffect(() => {
    let isCancelled = false;
    let cleanup: (() => void) | undefined;

    (async function loadDocument() {
      try {
        setIsLoading(true);

        const pdfDocumentLoadingTask = pdfjsLib.getDocument(url);

        cleanup = () => {
          pdfDocumentLoadingTask.destroy();
        };

        const pdfDocumentProxy = await pdfDocumentLoadingTask.promise;

        if (isCancelled) return;

        setIsLoading(false);
        setErrorMessage(undefined);
        setPdfDocument(pdfDocumentProxy);
      } catch (reason) {
        if (isCancelled) return;

        setIsLoading(false);
        setPdfDocument(undefined);
        setErrorMessage(typeof reason === 'string' ? reason : 'Document error');
      }
    })();

    return () => {
      cleanup?.();
    };
  }, [url]);

  return {
    pdfDocument,
    isLoading,
    errorMessage,
  };
}
