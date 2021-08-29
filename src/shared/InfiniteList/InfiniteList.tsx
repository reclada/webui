import React, { FC, useState, Children, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';

interface IListService {
  //getRow: (rowIndex: number, setLoading: (value: boolean) => void) => JSX.Element;
  rowCount: number;
  prepareNewData: (index: number, forward: boolean) => Promise<boolean>;
  //checkReadyData: (index: number) => boolean;
}

type InfiniteListProps = {
  className: string;
  rowCount: number;
  prepareNewData: (index: number, forward: boolean) => Promise<boolean>;
  checkData: (index: number) => boolean;
  itemSize: number;
};

export const InfiniteList: FC<InfiniteListProps> = function InfiniteList({
  className,
  rowCount,
  prepareNewData,
  checkData,
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
            const dataNotReady = checkData(props.overscanStartIndex);

            if (dataNotReady) {
              setLoading(dataNotReady);
              prepareNewData(props.overscanStartIndex, true).then(val => setLoading(val));
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
