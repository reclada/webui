import { useCallback, useRef, useState } from 'react';

export type UploadFileStatus = 'uploading' | 'success' | 'error';

export type UploadCancel = () => void;

export interface UploadFile {
  id: string;
  name: string;
  uploadStatus: UploadFileStatus;
  uploadProgress?: number;
  size?: number;
}

export interface UploadListResult {
  files: UploadFile[];
  setFile: (file: UploadFile) => void;
  setUploadCancel: (fileId: string, cancel: UploadCancel) => void;
  uploadCancel: (fileId: string) => void;
}

export function useUploadList(initialFiles: UploadFile[] = []): UploadListResult {
  const [files, setFiles] = useState<UploadFile[]>(initialFiles);
  const uploadCancelByFileIdRef = useRef<Record<string, UploadCancel>>({});

  const handleSetFile = useCallback((file: UploadFile) => {
    setFiles(curFiles => {
      const fileIndex = curFiles.findIndex(({ id }) => id === file.id);

      return fileIndex > -1
        ? [...curFiles.slice(0, fileIndex), file, ...curFiles.slice(fileIndex + 1)]
        : [file, ...curFiles];
    });
  }, []);

  const handleSetUploadCancel = useCallback(
    (fileId: string, uploadCancel: UploadCancel) => {
      uploadCancelByFileIdRef.current[fileId] = uploadCancel;
    },
    []
  );

  const handleUploadCancel = useCallback((fileId: string) => {
    uploadCancelByFileIdRef.current[fileId]?.();
    setFiles(curFiles => curFiles.filter(file => file.id !== fileId));
  }, []);

  return {
    files,
    setFile: handleSetFile,
    setUploadCancel: handleSetUploadCancel,
    uploadCancel: handleUploadCancel,
  };
}
