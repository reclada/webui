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

export async function fetchDatasources(datasetId?: string): Promise<IDatasource[]> {
  const recladaFileObjects = datasetId
    ? await fetchFilesListForDataset(datasetId)
    : await fetchFilesList();

  return recladaFileObjects.map(fileObject => {
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

async function fetchFilesList() {
  return apiService.callRpcPost<IRecladaFile[]>(rpcUrls.getRecladaObjectList, {
    class: RecladaObjectClass.DataSource,
    attrs: {},
  });
}

export async function fetchSourceById(id: string, objectClass: RecladaObjectClass) {
  return apiService.callRpcPost<IRecladaFile[] | null>(rpcUrls.getRecladaObjectList, {
    class: objectClass,
    id,
    attrs: {},
  });
}
