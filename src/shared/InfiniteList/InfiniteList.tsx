import React, { FC, Children, createRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

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

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          ref={listRef}
          className={className}
          height={height}
          itemCount={rowCount}
          itemSize={itemSize}
          useIsScrolling={true}
          width={width}
        >
          {({ index, isScrolling, style }) => {
            return (
              <div key={index} style={style}>
                {Children.map(children, child => {
                  if (React.isValidElement(child)) {
                    return React.cloneElement(child, { index, isScrolling });
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
