import { axiosCall } from '../utils/ajaxCall';

import { paths } from './paths';

export interface IArticleResponseObject {
  Articles: IArticle[] | null;
}
export enum ArticleType {
  PDF = 'PDF',
  XLS = 'XLS',
}
export interface IArticle {
  id: number;
  url: string;
  title: string;
  type?: ArticleType;
  snippets?: string[];
  dictionaries?: string[];
  // size: number;
}

const mockAnswer: IArticleResponseObject = {
  Articles: [
    {
      id: 1,
      url: 'null',
      title: 'example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: 2,
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.XLS,
    },
    {
      id: 3,
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: 4,
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
    },
    {
      id: 5,
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: 6,
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: 7,
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: 8,
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: 9,
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: 10,
      url: 'null',
      title: '/home/tishka17/src/poc_parser/allowed samples/simpletable.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
  ],
};

export function fetchArticles(query: string): Promise<IArticleResponseObject> {
  return axiosCall
    .post<IArticleResponseObject>(paths.search, { query_string: query })
    .then(({ data }) => data)
    .catch(err => {
      console.error(err);

      return mockAnswer;
    });
}
