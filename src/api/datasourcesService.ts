import { userService } from '../services/userService';

import { apiService } from './apiService';
import { ArticleType } from './articleService';
import { IRecladaFileObject } from './IRecladaObject';

export interface IDatasource {
  id: string;
  name: string;
  type: ArticleType;
  createDate: Date;
  author: string;
  lastUpdate: Date;
  whoUpdated: string;
  owners: string[];
}

// const date = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();

export async function fetchDatasources(datasetId?: string): Promise<IDatasource[]> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const recladaFileObjects = await fetchFilesList();

  return recladaFileObjects.map(fileObject => {
    const datasource: IDatasource = {
      id: fileObject.id,
      name: fileObject.attrs.name,
      type: ArticleType.PDF,
      createDate: new Date(),
      author: 'unknown',
      lastUpdate: new Date(),
      whoUpdated: 'unknown',
      owners: ['me', 'other'],
    };

    return datasource;
  });
}

async function fetchFilesList() {
  const token = userService.user.token;

  return apiService.callRpcPost<IRecladaFileObject[]>('/api/rpc/reclada_object_list', {
    class: 'File',
    attrs: {},
    access_token: token,
  });
}
