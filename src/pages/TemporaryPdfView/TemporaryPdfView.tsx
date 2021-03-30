import React from 'react';

import { DocumentViewer } from '../../documentViewer/DocumentViewer';

import style from './TemporaryPdfView.module.scss';

export const TemporaryPdfView: React.FC = function TemporaryPdfView() {
  return (
    <div className={style.root}>
      <DocumentViewer url="pdf/sample3.pdf" />
    </div>
  );
};
