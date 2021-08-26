import { OrderBy } from 'src/Sorting';

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

type DatasetRecladaResponse = {
  number: number;
  objects: IRecladaDataset[];
};

type DatasetResponse = {
  number: number;
  objects: IDataset[];
};

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

export async function fetchDatasets(
  order: OrderBy[],
  limit: number | string,
  offset?: number
): Promise<DatasetResponse> {
  const resp = await fetchRecladaDatasets(order, limit, offset);

  return {
    objects: resp.objects.map(object => {
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
    }),
    number: resp.number,
  };
}

async function fetchRecladaDatasets(
  order: OrderBy[],
  limit: number | string,
  offset?: number
) {
  return apiService.callRpcPost<DatasetRecladaResponse>(rpcUrls.getRecladaObjectList, {
    class: RecladaObjectClass.DataSet,
    attrs: {},
    orderBy: order,
    offset: !offset ? 0 : offset,
    limit: limit,
  });
}
