export interface IRecladaObject {
  GUID: string;
  revision: number;
  class: RecladaObjectClass;
  isDeleted: boolean;
  attributes: {
    [key: string]: any;
  };
}

export type RecladaPartialObject<T extends IRecladaObject> = {
  GUID?: string;
  class: T['class'];
  attributes: Partial<T['attributes']>;
  access_token?: string;
};

export enum RecladaObjectClass {
  File = 'File',
  DataSet = 'DataSet',
  DataSource = 'File',
}

export interface IRecladaFile extends IRecladaObject {
  class: RecladaObjectClass.File;
  attributes: {
    checksum: string;
    mimeType: string;
    name: string;
    uri: string;
  };
}

export interface IRecladaDataset extends IRecladaObject {
  dataSetId?: string;
  class: RecladaObjectClass.DataSet;
  attrs: {
    name: string;
    dataSources: string[];
    SomeDate: string;
  };
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
