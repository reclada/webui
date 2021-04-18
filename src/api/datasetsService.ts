import { axiosCall } from '../utils/ajaxCall';

export interface IDataset {
  id: string;
  title: string;
  tags?: string[];
  createDate: string;
  author: string;
  lastUpdate: string;
  whoUpdated: string;
  owner: string[];
}

export interface IDatasetsResponseObject {
  datasets: IDataset[];
}

const now = new Date();
const date = now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear();

const mockedAnswer: IDatasetsResponseObject = {
  datasets: [
    {
      id: '1',
      title: 'example-1',
      tags: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
      createDate: date,
      author: 'user1',
      lastUpdate: date,
      whoUpdated: 'user1',
      owner: ['user1'],
    },
    {
      id: '2',
      title: 'example-2',
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '3',
      title: 'example-3',
      tags: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '4',
      title: 'example-4',
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '5',
      title: 'example-5',
      tags: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '6',
      title: 'example-6',
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '7',
      title: 'example-7',
      tags: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '8',
      title: 'example-8',
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '9',
      title: 'example-9',
      tags: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '10',
      title: 'example-10',
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '11',
      title: 'example-11',
      tags: ['TEST', 'Sample text', 'Lorem ipsum dolor sit amet'],
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
    {
      id: '12',
      title: 'example-12',
      createDate: date,
      author: 'user2',
      lastUpdate: date,
      whoUpdated: 'user2',
      owner: ['user1', 'user2'],
    },
  ],
};

export async function fetchDatasets(): Promise<IDatasetsResponseObject> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return axiosCall
    .post<IDatasetsResponseObject>('/api/rpc/get_datasets', {})
    .then(({ data }) => data)
    .catch(err => {
      console.error(err);

      return mockedAnswer;
    });
}
