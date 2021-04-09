import { IArticle, Type } from './articleService';

export interface IDatasourceResponseObject {
  article: IArticle;
  createDate: string;
  author: string;
  lastUpdate: string;
  whoUpdated: string;
  owner: string[];
}
const now = new Date();
const date = now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear();

export const mockedDatasource: IDatasourceResponseObject[] = [
  {
    article: {
      id: 1,
      url: 'null',
      title: 'example3.pdf',
      dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
      type: Type.PDF,
    },
    createDate: date,
    author: 'user1',
    lastUpdate: date,
    whoUpdated: 'user1',
    owner: ['user1'],
  },
  {
    article: {
      id: 2,
      url: 'null',
      title: 'example3.pdf',
      dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
      type: Type.PDF,
    },
    createDate: date,
    author: 'user2',
    lastUpdate: date,
    whoUpdated: 'user2',
    owner: ['user1', 'user2'],
  },
  {
    article: {
      id: 2,
      url: 'null',
      title: 'example3.pdf',
      dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
      type: Type.PDF,
    },
    createDate: date,
    author: 'user2',
    lastUpdate: date,
    whoUpdated: 'user2',
    owner: ['user1', 'user2'],
  },
  {
    article: {
      id: 2,
      url: 'null',
      title: 'example3.pdf',
      dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
      type: Type.PDF,
    },
    createDate: date,
    author: 'user2',
    lastUpdate: date,
    whoUpdated: 'user2',
    owner: ['user1', 'user2'],
  },
  {
    article: {
      id: 2,
      url: 'null',
      title: 'example3.pdf',
      dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
      type: Type.PDF,
    },
    createDate: date,
    author: 'user2',
    lastUpdate: date,
    whoUpdated: 'user2',
    owner: ['user1', 'user2'],
  },
  {
    article: {
      id: 2,
      url: 'null',
      title: 'example3.pdf',
      dictionaries: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
      type: Type.PDF,
    },
    createDate: date,
    author: 'user2',
    lastUpdate: date,
    whoUpdated: 'user2',
    owner: ['user1', 'user2'],
  },
];
