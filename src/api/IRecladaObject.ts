export interface IRecladaObject {
  id: string;
  revision: number;
  class: RecladaObjectClass;
  isDeleted: boolean;
  attrs: {
    [key: string]: any;
  };
}

export type RecladaPartialObject<T extends IRecladaObject> = {
  id?: string;
  class: T['class'];
  attrs: Partial<T['attrs']>;
  access_token?: string;
};

export enum RecladaObjectClass {
  File = 'File',
  DataSet = 'DataSet',
  DataSource = 'DataSource',
}

export interface IRecladaFile extends IRecladaObject {
  class: RecladaObjectClass.File;
  attrs: {
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
