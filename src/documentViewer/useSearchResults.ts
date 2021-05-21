import { useMemo } from 'react';

export interface ISearchResultItem {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  text: string;
}

const items: ISearchResultItem[] = [
  {
    id: '1',
    left: 0.126,
    top: 0.097,
    width: 0.742,
    height: 0.023,
    text: 'Title',
  },
];

type SearchResultsParams = {
  width: number;
  height: number;
};

export function useSearchResults({
  width,
  height,
}: SearchResultsParams): ISearchResultItem[] {
  return useMemo(
    () =>
      items.map(item => ({
        left: width * item.left,
        top: height * item.top,
        width: width * item.width,
        height: height * item.height,
        text: item.text,
        id: item.id,
      })),
    [width, height]
  );
}
