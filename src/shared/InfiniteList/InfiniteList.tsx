import React, { FC, useState, Children, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';

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
  //const [isLoading, setLoading] = useState(false);
  //console.log('render infinite list');

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
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
