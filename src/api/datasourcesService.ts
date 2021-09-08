import { UserBadge } from 'src/shared/Navigation/UserBadge/UserBadge';
import { OrderBy } from 'src/shared/Sorting/Sorting';

import { apiService } from './apiService';
import { ArticleType, getArticleTypeByKey } from './articleService';
import { IRecladaFile, RecladaObjectClass } from './IRecladaObject';
import { rpcUrls } from './rpcUrls';
export interface IDatasource {
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
}

type RecladaFileResponse = {
  number: number;
  objects: IRecladaFile[];
};

type DatasourcesResponse = {
  number: number;
  objects: IDatasource[];
};

export async function fetchDatasources(
  datasetId?: string,
  orderBy?: OrderBy[],
  limit?: number,
  offset?: number
): Promise<DatasourcesResponse> {
  const recladaFileObjects = datasetId
    ? await fetchFilesListForDataset(
        datasetId,
        orderBy ? orderBy : [],
        limit === undefined ? 'ALL' : limit,
        offset === undefined ? 0 : offset
      )
    : await fetchFilesList(
        orderBy ? orderBy : [],
        limit === undefined ? 'ALL' : limit,
        offset === undefined ? 0 : offset
      );

  return {
    objects: recladaFileObjects.objects.map(fileObject => {
      const fd = fileObject.attrs.name.split('.');

      const datasource: IDatasource = {
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

      return datasource;
    }),
    number: recladaFileObjects.number,
  };
}

async function fetchFilesListForDataset(
  datasetId: string,
  orderBy: OrderBy[],
  limit: number | string,
  offset: number
) {
  return apiService.callRpcPost<RecladaFileResponse>(rpcUrls.getRecladaObjectsFromList, {
    id: datasetId,
    class: RecladaObjectClass.DataSet,
    relatedClass: RecladaObjectClass.DataSource,
    field: 'dataSources',
    orderBy: orderBy,
    limit: limit,
    offset: offset,
  });
}

async function fetchFilesList(
  orderBy: OrderBy[],
  limit: number | string,
  offset: number
) {
  return apiService.callRpcPost<RecladaFileResponse>(rpcUrls.getRecladaObjectList, {
    class: RecladaObjectClass.DataSource,
    attrs: {},
    orderBy: orderBy,
    limit: limit,
    offset: offset,
  });
}

export async function fetchSourceById(id: string, objectClass: RecladaObjectClass) {
  return apiService.callRpcPost<RecladaFileResponse | null>(
    rpcUrls.getRecladaObjectList,
    {
      class: objectClass,
      id,
      attrs: {},
    }
  );
}
