import React, { CSSProperties, FC, forwardRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  VariableSizeGrid as Grid,
  GridChildComponentProps,
  GridOnScrollProps,
} from 'react-window';

type InfiniteGridProps = {
  className?: string;
  style?: CSSProperties;
  rowCount: number;
  columnWidth: (index: number) => number;
  rowHeight: (index: number) => number;
  columnCount: number;
  itemSize?: number;
  children: FC<GridChildComponentProps>;
  onScroll?: (props: GridOnScrollProps) => any;
};

export const InfiniteGrid = forwardRef<Grid, InfiniteGridProps>(function InfiniteGrid(
  { className, rowCount, columnCount, columnWidth, rowHeight, children, onScroll, style },
  ref
) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <Grid
          ref={ref}
          className={className}
          columnCount={columnCount}
          columnWidth={columnWidth}
          height={height * 0.95}
          rowCount={rowCount}
          rowHeight={rowHeight}
          style={style}
          useIsScrolling={true}
          width={width}
          onScroll={onScroll}
        >
          {children}
        </Grid>
      )}
    </AutoSizer>
  );
});
