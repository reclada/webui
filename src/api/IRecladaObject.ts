export type Value = string | number | boolean | Date | any[];

export interface IRecladaObject {
  '{GUID}': string;
  '{class}': RecladaObjectClass;
  '{status}': string;
  '{createdTime}': string;
  '{transactionID}': number;
  '{attributes,name}': string;
  // [x: string]: Value | undefined;
}

export type RecladaPartialObject<T extends IRecladaObject> = Partial<T>;

export enum RecladaObjectClass {
  File = 'File',
  DataSet = 'DataSet',
  DataSource = 'File',
  JsonSchema = 'jsonschema',
}

export interface IRecladaFile extends IRecladaObject {
  '{class}': RecladaObjectClass.File;
  '{attributes,mimeType}': string;
  '{attributes,uri}': string;
  '{attributes,checksum}': string;
  '{attributes,tags}': unknown[];
}

export interface IRecladaDataset extends IRecladaObject {
  '{dataSetId}': string;
  // TODO: types for dataSources
  '{attributes,dataSources}': unknown[];
}

export type ObjectAttributes = {
  [key: string]: {
    caption: string;
    type: TypesKey;
    isSorting: boolean;
  };
};

export enum TypesKey {
  ARRAY = 'array',
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
}
