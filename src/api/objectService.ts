import { OrderBy, RFilter } from 'src/stores/Types';

import { apiService } from './apiService';
import { IColumn, IOrderColumn, IOrderRow } from './IColumn';
import { IRecladaObject, ObjectAttributes, RecladaObjectClass } from './IRecladaObject';
import { rpcUrls } from './rpcUrls';

export interface DisplaySettings {
  orderRow: IOrderRow;
  orderColumn: IOrderColumn;
  columns: Record<string, IColumn>;
}

export interface RecladaDisplaySettings {
  orderRow: IOrderRow;
  orderColumn: IOrderColumn;
  [x: string]: IColumn | IOrderRow | IOrderColumn;
}

export type Display<T = DisplaySettings> = {
  card: T;
  list: T;
  table: T;
  caption: string;
  preview: T;
  classGUID: string;
};

interface RecladaObjectResponse {
  number: number;
  display: Display<RecladaDisplaySettings>;
  objects: IRecladaObject[];
  lastChange: string;
}

interface ObjectResponse extends Omit<RecladaObjectResponse, 'display'> {
  display: Display;
}

export async function fetchObject(
  className: string,
  orderBy?: OrderBy[],
  limit?: number,
  offset?: number,
  filter?: RFilter
): Promise<ObjectResponse> {
  const recladaFileObjects = await fetchObjectList(
    className,
    orderBy ?? [],
    limit ?? 'ALL',
    offset ?? 0,
    filter
  );

  const {
    orderRow: tableOrderRow,
    orderColumn: tableOrderColumn,
    ...tableColumns
  } = recladaFileObjects.display.table;
  const {
    orderRow: cardOrderRow,
    orderColumn: cardOrderColumn,
    ...cardColumns
  } = recladaFileObjects.display.card;
  const {
    orderRow: listOrderRow,
    orderColumn: listOrderColumn,
    ...listColumns
  } = recladaFileObjects.display.list;
  const {
    orderRow: previewOrderRow,
    orderColumn: previewOrderColumn,
    ...previewColumns
  } = recladaFileObjects.display.preview;

  const formattedDisplay = {
    table: {
      orderRow: tableOrderRow,
      orderColumn: tableOrderColumn,
      columns: tableColumns as Record<string, IColumn>,
    },
    card: {
      orderRow: cardOrderRow,
      orderColumn: cardOrderColumn,
      columns: cardColumns as Record<string, IColumn>,
    },
    list: {
      orderRow: listOrderRow,
      orderColumn: listOrderColumn,
      columns: listColumns as Record<string, IColumn>,
    },
    preview: {
      orderRow: previewOrderRow,
      orderColumn: previewOrderColumn,
      columns: previewColumns as Record<string, IColumn>,
    },
  };

  return {
    ...recladaFileObjects,
    display: { ...recladaFileObjects.display, ...formattedDisplay },
  };
}

async function fetchObjectListForParent(
  parent: string,
  parentClassName: string,
  className: string
) {
  return apiService.callRpcPost<RecladaObjectResponse>(
    rpcUrls.getRecladaObjectsFromList,
    {
      id: parent,
      '{class}': parentClassName,
      relatedClass: className,
      field: 'dataSources',
    }
  );
}

async function fetchObjectList(
  className: string,
  orderBy: OrderBy[],
  limit: number | string,
  offset: number,
  filter?: RFilter
) {
  return apiService.callRpcPost<RecladaObjectResponse>(rpcUrls.getRecladaObjectList, {
    '{class}': className,
    attrs: {},
    orderBy: orderBy,
    limit: limit,
    offset: offset,
    filter,
  });
}

export async function fetchSourceById(id: string, objectClass: RecladaObjectClass) {
  return apiService.callRpcPost<RecladaObjectResponse | null>(
    rpcUrls.getRecladaObjectList,
    {
      '{class}': objectClass,
      id,
      attrs: {},
    }
  );
}

export async function fetchObjectSchema(className: string) {
  return apiService.callRpcPost<ObjectAttributes | null>(rpcUrls.getObjectSchema, {
    '{class}': className,
  });
}
