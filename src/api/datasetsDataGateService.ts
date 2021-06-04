import { apiService } from './apiService';
import {
  IRecladaDataset,
  RecladaObjectClass,
  RecladaPartialObject,
} from './IRecladaObject';
import { rpcUrls } from './rpcUrls';

export interface IDataset {
  id: string;
  title: string;
  tags?: string[];
  createDate: Date;
  author: string;
  lastUpdate: Date;
  whoUpdated: string;
  owners: string[];
}

export async function createDataset(name: string) {
  const dataSet: RecladaPartialObject<IRecladaDataset> = {
    class: RecladaObjectClass.DataSet,
    attrs: {
      name,
      dataSources: [],
    },
  };

  return apiService.callRpcPost(rpcUrls.createRecladaObject, dataSet);
}

export async function updateDataset(name: string, datasetId: string) {
  const dataSet: RecladaPartialObject<IRecladaDataset> = {
    id: datasetId,
    class: RecladaObjectClass.DataSet,
    attrs: {
      name,
      dataSources: [],
    },
  };

  return apiService.callRpcPost(rpcUrls.updateRecladaObject, dataSet);
}

export async function addDataSourcesToDataset(datasetId: string, ids: string[]) {
  const payload = {
    id: datasetId,
    class: RecladaObjectClass.DataSet,
    field: 'dataSources',
    value: ids,
  };

  return apiService.callRpcPost(rpcUrls.addToList, payload);
}

export async function fetchDatasets(): Promise<IDataset[]> {
  const objects = await fetchRecladaDatasets();

  return objects.map(object => {
    const dataset: IDataset = {
      id: object.id,
      title: object.attrs.name,
      tags: undefined,
      createDate: new Date(),
      author: 'unknown',
      lastUpdate: new Date(),
      whoUpdated: 'unknown',
      owners: ['me', 'other'],
    };

    return dataset;
  });
}

async function fetchRecladaDatasets() {
  return apiService.callRpcPost<IRecladaDataset[]>(rpcUrls.getRecladaObjectList, {
    class: RecladaObjectClass.DataSet,
    attrs: {},
  });
}
