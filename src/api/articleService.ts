import { axiosCall } from '../utils/ajaxCall';

import { paths } from './paths';

export interface IArticleResponseObject {
  Articles: IArticle[] | null;
}

export enum ArticleType {
  PDF = 'PDF',
  XLS = 'XLS',
  XLSX = 'XLSX',
  HTML = 'HTML',
  CSV = 'CSV',
  UDEFINDED = '',
}

export function getArticleTypeByKey(key: string): ArticleType {
  switch (key) {
    case ArticleType.PDF:
      return ArticleType.PDF;
    case ArticleType.XLS:
      return ArticleType.XLS;
    case ArticleType.XLSX:
      return ArticleType.XLSX;
    case ArticleType.HTML:
      return ArticleType.HTML;
    case ArticleType.CSV:
      return ArticleType.CSV;
    default:
      return ArticleType.UDEFINDED;
  }
}
export interface IArticle {
  id: string;
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
      id: '1',
      url: '/pdf/sample.pdf',
      title: 'example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: '2',
      url: '/pdf/sample2.pdf',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.XLS,
    },
    {
      id: '3',
      url: '/pdf/sample3.pdf',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: '4',
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
    },
    {
      id: '5',
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: '6',
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: '7',
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: '8',
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: '9',
      url: 'null',
      title: 's3://qde/testing/documents/example3.pdf',
      snippets: [],
      type: ArticleType.PDF,
    },
    {
      id: '10',
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
