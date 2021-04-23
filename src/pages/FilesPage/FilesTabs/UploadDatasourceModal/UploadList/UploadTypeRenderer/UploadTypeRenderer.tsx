import React, { FC, useMemo } from 'react';

import { UploadFile } from '../useUploadList';

import style from './UploadTypeRenderer.module.scss';

const getFileExtension = (fileName: string): string | undefined => {
  const parts = fileName.split('.');

  return parts.length > 0 ? parts[parts.length - 1].toUpperCase() : undefined;
};

type UploadFileTypeRendererProps = {
  file: UploadFile;
};

export const UploadTypeRenderer: FC<UploadFileTypeRendererProps> = function UploadTypeRenderer({
  file,
}) {
  const ext = useMemo(() => getFileExtension(file.name) ?? '-', [file.name]);

  return <div className={style.type}>{ext}</div>;
};
