import { axiosCall } from '../utils/ajaxCall';

import { IArticle, Type } from './articleService';

export interface IDatasource {
  id: string;
  article: IArticle;
  createDate: string;
  author: string;
  lastUpdate: string;
  whoUpdated: string;
  owner: string[];
}

export interface IDatasourcesResponseObject {
  datasources: IDatasource[];
}

const now = new Date();
const date = now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear();

export const mockedAnswer: IDatasourcesResponseObject = {
  datasources: [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
      id: '4',
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
      id: '5',
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
      id: '6',
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
      id: '7',
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
      id: '8',
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
      id: '9',
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
      id: '10',
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
      id: '11',
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
      id: '12',
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
  ],
};

export async function fetchDatasources(
  datasetId?: string
): Promise<IDatasourcesResponseObject> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return axiosCall
    .post<IDatasourcesResponseObject>('/api/rpc/get_datasources', { datasetId })
    .then(({ data }) => data)
    .catch(err => {
      console.error(err);

      return mockedAnswer;
    });
}
