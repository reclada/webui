import { OrderBy } from 'src/shared/Sorting/Sorting';

import { apiService } from './apiService';
import { ArticleType, getArticleTypeByKey } from './articleService';
import { IRecladaFile, RecladaObjectClass } from './IRecladaObject';
import { rpcUrls } from './rpcUrls';

export interface IRecladaObject {
  id: string;
  name: string;
  type: ArticleType;
  createDate: Date;
  author: string;
  lastUpdate: Date;
  whoUpdated: string;
  owners: string[];
  checksum: string;
  mimeType: string;
  attrs?: CustomAttibute;
}

type CustomAttibute = {
  [key: string]: string;
};

export async function fetchObject(
  datasetId?: string,
  orderBy?: OrderBy[],
  limit?: number,
  offset?: number
): Promise<IRecladaObject[]> {
  const recladaFileObjects = datasetId
    ? await fetchFilesListForDataset(datasetId)
    : await fetchFilesList(
        orderBy ? orderBy : [],
        limit ? limit : 'ALL',
        offset ? offset : 0
      );

  return recladaFileObjects.map(fileObject => {
    const fd = fileObject.attrs.name.split('.');

    const robject: IRecladaObject = {
      id: fileObject.id,
      name: fileObject.attrs.name,
      type: getArticleTypeByKey(fd.length ? fd[fd.length - 1].toUpperCase() : ''),
      createDate: new Date(),
      author: 'unknown',
      lastUpdate: new Date(),
      whoUpdated: 'unknown',
      owners: ['me', 'other'],
      checksum: '',
      mimeType: '',
    };

    return robject;
  });
}

async function fetchFilesListForDataset(datasetId: string) {
  return apiService.callRpcPost<IRecladaFile[]>(rpcUrls.getRecladaObjectsFromList, {
    id: datasetId,
    class: RecladaObjectClass.DataSet,
    relatedClass: RecladaObjectClass.DataSource,
    field: 'dataSources',
  });
}

async function fetchFilesList(
  orderBy: OrderBy[],
  limit: number | string,
  offset: number
) {
  return apiService.callRpcPost<IRecladaFile[]>(rpcUrls.getRecladaObjectList, {
    class: RecladaObjectClass.DataSource,
    attrs: {},
    orderBy: orderBy,
    limit: limit,
    offset: offset,
  });
}

export async function fetchSourceById(id: string, objectClass: RecladaObjectClass) {
  return apiService.callRpcPost<IRecladaFile[] | null>(rpcUrls.getRecladaObjectList, {
    class: objectClass,
    id,
    attrs: {},
  });
}
