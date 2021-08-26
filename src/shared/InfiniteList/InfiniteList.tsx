import React, { FC, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

interface IListService {
  getRow: (rowIndex: number, setLoading: (value: boolean) => void) => JSX.Element;
  rowCount: number;
}

type InfiniteListProps = {
  className: string;
  serviceData: IListService;
  itemSize: number;
};

export const InfiniteList: FC<InfiniteListProps> = function InfiniteList({
  className,
  serviceData,
  itemSize,
}) {
  const [isLoading, setLoading] = useState(false);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className={className}
          itemCount={serviceData.rowCount}
          height={height}
          itemSize={itemSize}
          width={width}
        >
          {({ index, style }) => {
            return (
              <div key={index} style={style}>
                {serviceData.getRow(index, setLoading)}
              </div>
            );
          }}
        </List>
      )}
    </AutoSizer>
  );
};
