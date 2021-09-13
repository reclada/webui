import React, { FC, createRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  VariableSizeGrid as Grid,
  GridChildComponentProps,
  VariableSizeGridProps,
} from 'react-window';

type InfiniteGridProps = {
  className: string;
  rowCount: number;
  columnWidth: (index: number) => number;
  rowHeight: (index: number) => number;
  columnCount: number;
  itemSize: number;
  children: FC<GridChildComponentProps>;
};

export const InfiniteGrid: FC<InfiniteGridProps> = function InfiniteGrid({
  className,
  rowCount,
  columnCount,
  columnWidth,
  rowHeight,
  children,
}) {
  const listRef = createRef<Grid>();

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Grid
          ref={listRef}
          className={className}
          columnCount={columnCount}
          columnWidth={columnWidth}
          height={height}
          rowCount={rowCount}
          rowHeight={rowHeight}
          useIsScrolling={true}
          width={width}
        >
          {children}
        </Grid>
      )}
    </AutoSizer>
  );
};
