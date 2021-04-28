export interface IRecladaFileObject {
  id: string;
  revision: number;
  attrs: {
    checksum: string;
    mimeType: string;
    name: string;
    uri: string;
  };
  class: 'File';
  isDeleted: boolean;
}
