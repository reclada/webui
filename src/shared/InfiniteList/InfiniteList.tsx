import React, { ComponentType, createContext, FC, useContext, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { getDatasourceDownloadLink } from 'src/api/dataSourceDataGateService';

interface IListService {
  getRow: (columnIndex: number, rowIndex: number) => JSX.Element;
  rowCount: number;
}

type InfiniteListProps = {
  className: string;
  serviceData: IListService;
  itemSize: number;
  height: number;
  width: number;
};

const defContext = {
  service: {
    getRow: (columnIndex: number, rowIndex: number) => <></>,
    rowCount: 100,
  },
  setLoading: (value: boolean) => {},
};

const context = createContext(defContext);

export const InfiniteList: FC<InfiniteListProps> = function InfiniteList({
  className,
  serviceData,
  itemSize,
  height,
  width,
}) {
  const [isLoading, setLoading] = useState(false);
  return (
    <context.Provider value={{ service: serviceData, setLoading: setLoading }}>
      <List
        itemCount={serviceData.rowCount}
        height={height}
        itemSize={itemSize}
        width={width}
      >
        {Cell}
      </List>
    </context.Provider>
  );
};

const Cell: ComponentType<any> = ({ columnIndex, rowIndex, style }) => {
  const { service, setLoading } = useContext(context);
  return (
    <div style={style}>
      <ColumnData getData={service.getRow.bind(service, columnIndex, rowIndex)} />
    </div>
  );
};

type ColumnDataProps = {
  getData: () => {};
};

const ColumnData: FC<ColumnDataProps> = function ColumnData({ getData }) {
  return <>{getData()}</>;
};
