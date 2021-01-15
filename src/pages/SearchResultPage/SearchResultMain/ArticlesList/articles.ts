export interface IArticleFound {
  title: string;
  type: string;
  mentions: number;
  synonyms: number;
  snippets: ArticleParagraph[];
}

export type ArticleParagraph = Array<string | IArticleSelection>;

export interface IArticleSelection {
  text: string;
  color: string;
}

const article: IArticleFound = {
  title: 'super-mega-long-file-name',
  type: 'PDF',
  mentions: 3,
  synonyms: 12,
  snippets: [
    [
      'Lorem ipsum dolor sit amet, ',
      { text: 'consectetur', color: 'rgba(51, 51, 51, 0.2)' },
      ' adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
    [
      'Ut enim ad minim veniam, quis nostrud ',
      { text: 'exercitation', color: 'rgba(51, 51, 51, 0.2)' },
      ' ullamco laboris nisi ut aliquip ex ea .',
    ],
    [
      'Duis aute irure dolor in ',
      { text: 'reprehenderit', color: 'rgba(51, 51, 51, 0.2)' },
      ' in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    ],
  ],
};

export const articles = Array.from({ length: 50 }).fill(article) as IArticleFound[];
