import React, { FC, Children, createRef, ComponentType, CSSProperties } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

type InfiniteListProps = {
  className: string;
  rowCount: number;
  itemSize: number;
  children: FC<ListChildComponentProps>;
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
          {children}
        </List>
      )}
    </AutoSizer>
  );
};
