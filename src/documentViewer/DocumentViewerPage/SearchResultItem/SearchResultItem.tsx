import { Popover } from 'antd';
import React, { FC } from 'react';

import { classNames } from '../../../utils/classNames';
import { ISearchResultItem } from '../useSearchResults';

import style from './SearchResultItem.module.scss';

type SearchResultItemProps = {
  className?: string;
  item: ISearchResultItem;
};

export const SearchResultItem: FC<SearchResultItemProps> = function SearchResultItem({
  className,
  item,
}) {
  return (
    <Popover content={<div> {item.text} </div>}>
      <div
        className={classNames(className, style.root)}
        style={{
          width: item.width,
          height: item.height,
          top: item.top,
          left: item.left,
        }}
      />
    </Popover>
  );
};
