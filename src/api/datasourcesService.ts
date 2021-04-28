import { axiosCall, CancelToken } from '../utils/ajaxCall';
import { userService } from '../services/userService';
import { axiosCall } from '../utils/ajaxCall';

import { IArticle, Type } from './articleService';

export interface IDatasource {
  id: string;
  article: IArticle;
  createDate: string;
  author: string;
  lastUpdate: string;
  whoUpdated: string;
  owner: string[];
}

export interface IDatasourcesResponseObject {
  datasources: IDatasource[];
}

const now = new Date();
const date = now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear();

export const mockedAnswer: IDatasourcesResponseObject = {
  datasources: [
    {
      id: '1',
      article: {
        id: 1,
        url: 'null',
        title: 'example3.pdf',
        dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
        type: Type.PDF,
      },
      createDate: date,
      author: 'user1',
      lastUpdate: date,
      whoUpdated: 'user1',
      owner: ['user1'],
    },
    {
      id: '2',
      article: {
        id: 2,
        url: 'null',
        title: 'example3.pdf',
        dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
        type: Type.PDF,
      },
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '3',
      article: {
        id: 2,
        url: 'null',
        title: 'example3.pdf',
        dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
        type: Type.PDF,
      },
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '4',
      article: {
        id: 2,
        url: 'null',
        title: 'example3.pdf',
        dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
        type: Type.PDF,
      },
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '5',
      article: {
        id: 2,
        url: 'null',
        title: 'example3.pdf',
        dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
        type: Type.PDF,
      },
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '6',
      article: {
        id: 2,
        url: 'null',
        title: 'example3.pdf',
        dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
        type: Type.PDF,
      },
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '7',
      article: {
        id: 2,
        url: 'null',
        title: 'example3.pdf',
        dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
        type: Type.PDF,
      },
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '8',
      article: {
        id: 2,
        url: 'null',
        title: 'example3.pdf',
        dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
        type: Type.PDF,
      },
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '9',
      article: {
        id: 2,
        url: 'null',
        title: 'example3.pdf',
        dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
        type: Type.PDF,
      },
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '10',
      article: {
        id: 2,
        url: 'null',
        title: 'example3.pdf',
        dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
        type: Type.PDF,
      },
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '11',
      article: {
        id: 2,
        url: 'null',
        title: 'example3.pdf',
        dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
        type: Type.PDF,
      },
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '12',
      article: {
        id: 2,
        url: 'null',
        title: 'example3.pdf',
        dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
        type: Type.PDF,
      },
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
  ],
};

export async function fetchDatasources(
  datasetId?: string
): Promise<IDatasourcesResponseObject> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return axiosCall
    .post<IDatasourcesResponseObject>('/api/rpc/get_datasources', { datasetId })
    .then(({ data }) => data)
    .catch(err => {
      console.error(err);

      return mockedAnswer;
    });
}

interface IDatasourceResponseObject {
  datasource: IDatasource;
}

interface UploadDatasourceOptions {
  onProgress?: (percent: number) => void;
  onSetCancel?: (cancel: () => void) => void;
}

export async function uploadDatasource(
  file: Blob,
  options: UploadDatasourceOptions = {}
): Promise<IDatasourceResponseObject> {
  const formData = new FormData();

  formData.append('file', file);

  return axiosCall
    .post<IDatasourceResponseObject>('/api/rpc/upload_datasource_file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (event: ProgressEvent) => {
        if (event.lengthComputable) {
          options.onProgress?.(Math.round(event.loaded / event.total) * 100);
        }
      },
      cancelToken: new CancelToken(cancel => options.onSetCancel?.(() => cancel())),
    })
    .then(({ data }) => data);
}

export const mockedUploadDatasource = (
  file: File,
  options: UploadDatasourceOptions = {}
): Promise<IDatasourceResponseObject> => {
  return new Promise((resolve, reject) => {
    let cancelled = false;

    options.onSetCancel?.(() => {
      cancelled = true;
    });

    const progressTick = (curProgress: number) => {
      setTimeout(() => {
        if (cancelled) {
          reject('cancelled');

          return;
        }

        if (curProgress >= 100) {
          resolve({ datasource: mockedAnswer.datasources[0] });
        } else {
          options.onProgress?.(curProgress);
          progressTick(curProgress + 5);
        }
      }, 200);
    };

    progressTick(0);
  });
};

interface IRecladaObjectFile {
  id: string;
  revision: number;
  attrs: {
    checksum: string;
    mimeType: string;
    name: string;
    uri: string;
  };
  class: 'File';
  isDeleted: boolean;
}

export async function fetchFilesList() {
  const token = userService.user.token;

  return axiosCall
    .post<IRecladaObjectFile[]>(
      '/api/rpc/reclada_object_list',
      {
        data: {
          class: 'File',
          attrs: {},
          access_token: token,
        },
      },
      {
        headers: { 'Content-Profile': 'api' },
      }
    )
    .then(res => {
      console.log('reclada_object_list', res.data);

      return res.data;
    });
}
