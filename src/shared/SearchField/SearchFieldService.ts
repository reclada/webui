export enum SearchTagType {
  Token = 'Token',
  Operator = 'Operator',
  String = 'String',
  InProgress = 'InProgress',
}

export interface ISearchFieldElement {
  id: string;
  type: SearchTagType;
  text: string;
}
