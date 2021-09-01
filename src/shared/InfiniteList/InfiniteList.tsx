import React, { FC, useState, Children, useEffect, useRef, createRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  FixedSizeList,
  FixedSizeList as List,
  ListOnItemsRenderedProps,
} from 'react-window';

import { datasetsDataService } from 'src/pages/FilesPage/FilesTabs/DatasetsPane/datasetsData.service';

type InfiniteListProps = {
  className: string;
  rowCount: number;
  itemSize: number;
};

export const InfiniteList: FC<InfiniteListProps> = function InfiniteList({
  className,
  rowCount,
  itemSize,
  children,
}) {
  const listRef = createRef<List>();

  var rendered = false;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          ref={listRef}
          className={className}
          height={height}
          itemCount={rowCount}
          itemSize={itemSize}
          width={width}
        >
          {({ index, style }) => {
            return (
              <div key={index} style={style}>
                {Children.map(children, child => {
                  if (React.isValidElement(child)) {
                    return React.cloneElement(child, { index });
                  }
                })}
              </div>
            );
          }}
        </List>
      )}
    </AutoSizer>
  );
};
