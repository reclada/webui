import { apiService } from './apiService';
import { ArticleType } from './articleService';
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
  return apiService.callRpcPost<IRecladaFile[]>(rpcUrls.getRecladaObjectList, {
    class: RecladaObjectClass.File,
    attrs: {},
  });
}
