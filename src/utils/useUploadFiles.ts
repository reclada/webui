import omit from 'lodash/omit';
import { useMemo, useReducer } from 'react';

export type UploadFileStatus = 'uploading' | 'success' | 'error' | 'cancelled';

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
  if (fileInfo.uploadStatus === 'cancelled') {
    return {
      byId: omit(state.byId, fileInfo.id),
      ids: state.ids.filter(id => id !== fileInfo.id),
    };
  }

  return {
    byId: {
      ...state.byId,
      [fileInfo.id]: fileInfo,
    },
    ids: state.byId[fileInfo.id] === undefined ? [fileInfo.id, ...state.ids] : state.ids,
  };
}

function initUploadFilesState(filesInfos: UploadFileInfo[]): UploadFilesState {
  return {
    byId: filesInfos.reduce<UploadFilesState['byId']>((acc, fileInfo) => {
      acc[fileInfo.id] = fileInfo;

      return acc;
    }, {}),
    ids: filesInfos.map(fileInfo => fileInfo.id),
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
