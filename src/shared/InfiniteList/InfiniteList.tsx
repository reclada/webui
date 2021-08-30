import React, { FC, useState, Children, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';

type InfiniteListProps = {
  className: string;
  rowCount: number;
  prepareNewPage: (index: number) => Promise<boolean> | null;
  itemSize: number;
};

export const InfiniteList: FC<InfiniteListProps> = function InfiniteList({
  className,
  rowCount,
  prepareNewPage,
  itemSize,
  children,
}) {
  const [isLoading, setLoading] = useState(false);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className={className}
          height={height}
          itemCount={rowCount}
          // itemData={{ isLoading, setLoading }}
          itemSize={itemSize}
          width={width}
          onItemsRendered={(props: ListOnItemsRenderedProps) => {
            const result = prepareNewPage(props.overscanStartIndex);

            if (result) {
              setLoading(true);
              result.then(val => setLoading(val));
            }
          }}
          // onScroll={props => {
          //   console.log(props.scrollOffset);
          //   prepareNewData(
          //     props.scrollOffset,
          //     props.scrollDirection === 'forward'
          //   ).then(val => setLoading(val));
          // }}
        >
          {({ index, style }) => {
            return (
              <div key={index} style={style}>
                {Children.map(children, child => {
                  if (React.isValidElement(child)) {
                    return React.cloneElement(child, { index, isLoading });
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
