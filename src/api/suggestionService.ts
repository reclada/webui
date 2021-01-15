import { axiosCall } from '../utils/ajaxCall';

import { paths } from './paths';

export interface ISuggestionResponseObject {
  Suggestions: ISuggestion[] | null;
}

export interface ISuggestion {
  id: number;
  text: string;
  group: string;
  exact_match: boolean;
}

const mockAnswer: ISuggestionResponseObject = {
  Suggestions: [
    {
      id: 4670,
      text: 'C22W1.005',
      group: 'test',
      exact_match: false,
    },
    {
      id: 4671,
      text: 'C22W9.009',
      group: 'test',
      exact_match: false,
    },
  ],
};

export function fetchSuggestions(query: string): Promise<ISuggestionResponseObject> {
  return axiosCall
    .post<ISuggestionResponseObject>(paths.suggest, { query_string: query })
    .then(({ data }) => data)
    .catch(err => {
      console.error(err);

      return mockAnswer;
    });
}
