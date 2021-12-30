import { OrderBy } from 'src/stores/Types';

import { apiService } from './apiService';
import { IRecladaObject, ObjectAttributes, RecladaObjectClass } from './IRecladaObject';
import { rpcUrls } from './rpcUrls';

type DatasetObjectResponse = {
  number: number;
  objects: IRecladaObject[];
};

export async function fetchObject(
  className: string,
  orderBy?: OrderBy[],
  limit?: number,
  offset?: number
): Promise<DatasetObjectResponse> {
  const recladaFileObjects = await fetchObjectList(
    className,
    orderBy ? orderBy : [],
    limit ? limit : 'ALL',
    offset ? offset : 0
  );

  // return recladaFileObjects.map(fileObject => {
  //   const robject: IRecladaObject = {
  //     id: fileObject.id,
  //     revision: fileObject.r
  //     attrs: fileObject.attrs,
  //   };

  return recladaFileObjects;
}

async function fetchObjectListForParent(
  parent: string,
  parentClassName: string,
  className: string
) {
  return apiService.callRpcPost<DatasetObjectResponse>(
    rpcUrls.getRecladaObjectsFromList,
    {
      id: parent,
      class: parentClassName,
      relatedClass: className,
      field: 'dataSources',
    }
  );
}

async function fetchObjectList(
  className: string,
  orderBy: OrderBy[],
  limit: number | string,
  offset: number
) {
  return apiService.callRpcPost<DatasetObjectResponse>(rpcUrls.getRecladaObjectList, {
    class: className,
    attrs: {},
    orderBy: orderBy,
    limit: limit,
    offset: offset,
  });
}

export async function fetchSourceById(id: string, objectClass: RecladaObjectClass) {
  return apiService.callRpcPost<DatasetObjectResponse | null>(
    rpcUrls.getRecladaObjectList,
    {
      class: objectClass,
      id,
      attrs: {},
    }
  );
}

export async function fetchObjectSchema(className: string) {
  return apiService.callRpcPost<ObjectAttributes | null>(rpcUrls.getObjectSchema, {
    class: className,
  });
}
