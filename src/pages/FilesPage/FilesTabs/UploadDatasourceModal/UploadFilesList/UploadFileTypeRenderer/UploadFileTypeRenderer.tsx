import React, { FC, useMemo } from 'react';

import { UploadFileInfo } from '../../../../../../utils/useUploadFiles';

import style from './UploadFileTypeRenderer.module.scss';

const getFileExtension = (fileName: string): string | undefined => {
  const parts = fileName.split('.');

  return parts.length > 0 ? parts[parts.length - 1].toUpperCase() : undefined;
};

type UploadFileTypeRendererProps = {
  fileInfo: UploadFileInfo;
};

export const UploadFileTypeRenderer: FC<UploadFileTypeRendererProps> = function UploadFileTypeRenderer({
  fileInfo,
}) {
  const ext = useMemo(() => getFileExtension(fileInfo.name) ?? '-', [fileInfo.name]);

  return <div className={style.fileType}>{ext}</div>;
};
