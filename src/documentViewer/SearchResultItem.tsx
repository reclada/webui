import React, { FC } from 'react';

import { classNames } from '../utils/classNames';

import style from './SearchResultItem.module.scss';
import { ISearchResultItem } from './useSearchResults';

type SearchResultItemProps = {
  className?: string;
  item: ISearchResultItem;
};

export const SearchResultItem: FC<SearchResultItemProps> = function SearchResultItem({
  className,
  item,
}) {
  return (
    <div
      className={classNames(className, style.root)}
      style={{
        width: item.width,
        height: item.height,
        top: item.top,
        left: item.left,
      }}
      onMouseEnter={event => console.log(event)}
    />
  );
};
