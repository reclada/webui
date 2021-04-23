import { useMemo, useReducer } from 'react';

export type UploadFileStatus = 'uploading' | 'success' | 'error';

export interface UploadFileInfo {
  id: string;
  name: string;
  size?: number;
  uploadProgress?: number;
  uploadStatus: UploadFileStatus;
}

export interface UploadFilesState {
  byId: Record<string, UploadFileInfo>;
  ids: string[];
}

function uploadFilesReducer(
  state: UploadFilesState,
  fileInfo: UploadFileInfo
): UploadFilesState {
  return {
    byId: {
      ...state.byId,
      [fileInfo.id]: fileInfo,
    },
    ids: state.byId[fileInfo.id] === undefined ? [fileInfo.id, ...state.ids] : state.ids,
  };
}

function initUploadFilesState(files: UploadFileInfo[]): UploadFilesState {
  return {
    byId: files.reduce<UploadFilesState['byId']>((acc, file) => {
      acc[file.id] = file;

      return acc;
    }, {}),
    ids: files.map(file => file.id),
  };
}

export function useUploadFiles(
  initialFiles: UploadFileInfo[] = []
): [UploadFileInfo[], (fileInfo: UploadFileInfo) => void] {
  const [state, setFileInfo] = useReducer(
    uploadFilesReducer,
    initialFiles,
    initUploadFilesState
  );
  const files: UploadFileInfo[] = useMemo(() => state.ids.map(id => state.byId[id]), [
    state,
  ]);

  return [files, setFileInfo];
}
