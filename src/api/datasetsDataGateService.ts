import { OrderBy } from 'src/stores/Types';

import { apiService } from './apiService';
import {
  IRecladaDataset,
  RecladaObjectClass,
  RecladaPartialObject,
} from './IRecladaObject';
import { rpcUrls } from './rpcUrls';

export interface IDataset {
  '{GUID}:string': string;
  title: string;
  tags?: string[];
  createDate: Date;
  author: string;
  lastUpdate: Date;
  whoUpdated: string;
  owners: string[];
}

type DatasetRecladaResponse = {
  number: number;
  objects: IRecladaDataset[];
};

export async function createDataset(name: string) {
  const dataSet: RecladaPartialObject<IRecladaDataset> = {
    '{class}': RecladaObjectClass.DataSet,
    '{attributes,name}': name,
    '{attributes,dataSources}': [],
  };

  return apiService.callRpcPost(rpcUrls.createRecladaObject, dataSet);
}

export async function updateDataset(name: string, datasetId: string) {
  const dataSet: RecladaPartialObject<IRecladaDataset> = {
    '{GUID}': datasetId,
    '{class}': RecladaObjectClass.DataSet,
    '{attributes,name}': name,
    '{attributes,dataSources}': [],
  };

  return apiService.callRpcPost(rpcUrls.updateRecladaObject, dataSet);
}

export async function addDataSourcesToDataset(datasetId: string, ids: string[]) {
  const payload = {
    GUID: datasetId,
    class: RecladaObjectClass.DataSet,
    field: 'dataSources',
    value: ids,
  };

  return apiService.callRpcPost(rpcUrls.addToList, payload);
}

export async function fetchDatasets(
  order: OrderBy[],
  limit: number | string,
  offset?: number
): Promise<DatasetRecladaResponse> {
  const resp = await fetchRecladaDatasets(order, limit, offset);

  return resp;
}

async function fetchRecladaDatasets(
  order: OrderBy[],
  limit: number | string,
  offset?: number
) {
  return apiService.callRpcPost<DatasetRecladaResponse>(rpcUrls.getRecladaObjectList, {
    '{class}': RecladaObjectClass.DataSet,
    attributes: {},
    orderBy: order,
    offset: !offset ? 0 : offset,
    limit: limit,
  });
}
