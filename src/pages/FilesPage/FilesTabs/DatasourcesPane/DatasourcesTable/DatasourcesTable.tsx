import { Divider, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { observer } from 'mobx-react-lite';
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import AutoSizer from 'react-virtualized-auto-sizer';
import { GridChildComponentProps, VariableSizeGrid } from 'react-window';

import { classNames } from 'src/utils/classNames';

import { DatasourcesTableRowGrid } from '../DatasourcesTableRowGrid/DatasourcesTableRowGrid';
import { datasourceTableService } from '../datasourceTable.service';
import { MoreMenuRenderer } from '../shared/MoreMenuRenderer/MoreMenuRenderer';

import styleModule from './DatasourcesTable.module.scss';

const defContextHeader = {
  onStart: (event: DraggableEvent, data: DraggableData) => {},
  onStop: (event: DraggableEvent, data: DraggableData) => {},
};
const DragContext = createContext(defContextHeader);

const defRowContext = {
  setHeight: (index: number, val: number) => {},
  setWidth: (index: number, val: number) => {},
};

export const RowContext = createContext(defRowContext);

export const DatasourcesTable = observer(function DatasourcesTable() {
  const staticGridHeader = useRef<VariableSizeGrid>(null);
  const leftFixedGrid = useRef<VariableSizeGrid>(null);
  const rightFixedGrid = useRef<VariableSizeGrid>(null);
  const mainFixedGrid = useRef<VariableSizeGrid>(null);
  const onScroll = useCallback(({ scrollLeft, scrollTop, scrollUpdateWasRequested }) => {
    if (!scrollUpdateWasRequested) {
      staticGridHeader.current?.scrollTo({ scrollLeft, scrollTop: 0 });
      leftFixedGrid.current?.scrollTo({ scrollLeft: 0, scrollTop });
      rightFixedGrid.current?.scrollTo({ scrollLeft: 0, scrollTop });
    }
  }, []);

  const sizeMap = React.useRef<{ [key: string]: number }>({});
  const sizeMapWidth = React.useRef<{ [key: string]: number }>({});

  const setWidth = useCallback((index: number, size: number) => {
    console.log('set', size);

    if (
      size > datasourceTableService.getAttributeDataByIndex(index).width &&
      (!sizeMapWidth.current[index] || sizeMapWidth.current[index] < size)
    ) {
      sizeMapWidth.current = { ...sizeMapWidth.current, [index]: size };

      if (mainFixedGrid.current) {
        mainFixedGrid.current.resetAfterColumnIndex(index);
      } else {
        setTimeout(() => {
          if (mainFixedGrid.current) {
            mainFixedGrid.current.resetAfterColumnIndex(index);
          }
        }, 100);
      }

      if (staticGridHeader.current) {
        staticGridHeader.current.resetAfterColumnIndex(index);
      } else {
        setTimeout(() => {
          if (staticGridHeader.current) {
            staticGridHeader.current.resetAfterColumnIndex(index);
          }
        }, 100);
      }
    }
  }, []);

  const getWidth = useCallback((index: number) => {
    //console.log('width', sizeMapWidth.current[index]);

    return (
      sizeMapWidth.current[index] ||
      datasourceTableService.getAttributeDataByIndex(index).width
    );
  }, []);

  const setHeight = useCallback((index: number, size: number) => {
    if (size > 55 && (!sizeMap.current[index] || sizeMap.current[index] < size)) {
      sizeMap.current = { ...sizeMap.current, [index]: size };

      if (mainFixedGrid.current) {
        mainFixedGrid.current.resetAfterRowIndex(index);
      } else {
        setTimeout(() => {
          if (mainFixedGrid.current) {
            mainFixedGrid.current.resetAfterRowIndex(index);
          }
        }, 100);
      }

      if (leftFixedGrid.current) {
        leftFixedGrid.current.resetAfterRowIndex(index);
      } else {
        setTimeout(() => {
          if (leftFixedGrid.current) {
            leftFixedGrid.current.resetAfterRowIndex(index);
          }
        }, 100);
      }
    }
  }, []);

  const getHeight = useCallback(index => {
    return sizeMap.current[index] || 55;
  }, []);

  const calcEstimatedSize = useCallback(() => {
    const keys = Object.keys(sizeMap.current);
    const estimatedHeight = keys.reduce((param, i) => param + sizeMap.current[i], 0);

    return estimatedHeight / keys.length;
  }, []);

  const calcEstimatedSizeWidth = React.useCallback(() => {
    const keys = Object.keys(sizeMapWidth.current);
    const estimatedWidth = keys.reduce((param, i) => param + sizeMap.current[i], 0);

    return estimatedWidth / keys.length;
  }, []);

  const onStartDrag = useCallback((event: DraggableEvent, data: DraggableData) => {
    const ids = data.node.id.split('/') as string[];

    if (ids[0] === '-1') datasourceTableService.setColumnSelect(+ids[1]);

    if (ids[1] === '-1') datasourceTableService.setRowDragging(+ids[0]);
  }, []);
  const onStopDrag = useCallback((event: DraggableEvent, data: DraggableData) => {
    const ids = data.node.id.split('/') as string[];

    datasourceTableService.setColumnSelect(undefined);
    datasourceTableService.setRowDragging(undefined);
    //console.log(data.x, data.deltaX);

    if (ids[0] === 'devider-column') {
      datasourceTableService.setColumnWidth(+ids[1], data.x);
      mainFixedGrid.current?.resetAfterColumnIndex(+ids[1]);
      staticGridHeader.current?.resetAfterColumnIndex(+ids[1]);

      return;
    }

    if (ids[0] === '-1') datasourceTableService.setColumnOrder(+ids[1], data.x);
  }, []);

  return (
    <DragContext.Provider
      value={{
        onStop: onStopDrag,
        onStart: onStartDrag,
      }}
    >
      <div className={styleModule.headTable}>
        <div
          className={classNames(styleModule.columnTable, styleModule.columnHeader)}
          style={{ width: '35px' }}
        >
          <Checkbox
            checked={datasourceTableService.selectedRows.length > 0}
            className={styleModule.checkboxCard}
            disabled={true}
          />
          <Divider className={styleModule.dividerHeader} type="vertical" />
        </div>
        <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
          <AutoSizer>
            {({ height, width }) => (
              <VariableSizeGrid
                ref={staticGridHeader}
                columnCount={7}
                columnWidth={getWidth}
                height={height}
                rowCount={1}
                rowHeight={(index: number) => 52.25}
                style={{ overflowX: 'hidden' }}
                width={width}
              >
                {DatasourcesTableHeader}
              </VariableSizeGrid>
            )}
          </AutoSizer>
        </div>
        <div style={{ width: '45px' }}></div>
      </div>
      <div className={styleModule.table}>
        <div style={{ width: '35px' }}>
          <AutoSizer>
            {({ height, width }) => (
              <VariableSizeGrid
                ref={leftFixedGrid}
                columnCount={1}
                columnWidth={(index: number) => 30}
                height={height}
                rowCount={datasourceTableService.count}
                rowHeight={getHeight}
                style={{ overflowY: 'hidden' }}
                width={width}
              >
                {DatasourcesCheckBoxRow}
              </VariableSizeGrid>
            )}
          </AutoSizer>
        </div>
        <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
          <RowContext.Provider value={{ setHeight: setHeight, setWidth: setWidth }}>
            <AutoSizer>
              {({ height, width }) => (
                <VariableSizeGrid
                  ref={mainFixedGrid}
                  columnCount={7}
                  columnWidth={getWidth}
                  estimatedColumnWidth={calcEstimatedSizeWidth()}
                  estimatedRowHeight={calcEstimatedSize()}
                  height={height}
                  rowCount={datasourceTableService.count}
                  rowHeight={getHeight}
                  width={width}
                  onScroll={onScroll}
                >
                  {DatasourcesTableRowGrid}
                </VariableSizeGrid>
              )}
            </AutoSizer>
          </RowContext.Provider>
        </div>
        <div style={{ width: '35px' }}>
          <AutoSizer>
            {({ height, width }) => (
              <VariableSizeGrid
                ref={rightFixedGrid}
                columnCount={1}
                columnWidth={(index: number) => 35}
                height={height}
                rowCount={datasourceTableService.count}
                rowHeight={(index: number) => 55}
                style={{ overflowY: 'hidden' }}
                width={width}
              >
                {DatasourcesMoreMenuRow}
              </VariableSizeGrid>
            )}
          </AutoSizer>
        </div>
      </div>
    </DragContext.Provider>
  );
});

const DatasourcesTableHeader: FC<GridChildComponentProps> = observer(
  function DatasourcesTableHeader({ columnIndex, rowIndex, style }) {
    const context = useContext(DragContext);

    // const onDoubleClick = useCallback(() => {
    //   datasourceTableService.setColumnCustomWidth(
    //     columnIndex,
    //     !!datasourceTableService.isColumnCustomWidth(columnIndex)
    //   );
    // }, [columnIndex]);

    const className =
      datasourceTableService.columnSelect === columnIndex
        ? styleModule.draggingColumnHeader
        : '';

    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex',
        }}
        // onDoubleClick={onDoubleClick}
      >
        <Draggable
          axis="x"
          defaultClassName={styleModule.draggableColumnHeader}
          defaultClassNameDragging={classNames(className, styleModule.dragging)}
          disabled={false}
          grid={[25, 0]}
          position={{ x: 0, y: 0 }}
          onStart={context.onStart}
          onStop={context.onStop}
        >
          <div
            className={classNames(styleModule.columnTable, styleModule.columnHeader)}
            id={'-1/' + columnIndex}
            style={{ width: '100%' }}
          >
            {datasourceTableService.getAttributeDataByIndex(columnIndex).caption}
          </div>
        </Draggable>
        <Draggable
          axis="x"
          defaultClassName={styleModule.draggableDevider}
          defaultClassNameDragging={styleModule.dragging}
          {...context}
          position={{ x: 0, y: 0 }}
        >
          <div
            className={styleModule.columnHeader}
            id={'devider-column/' + columnIndex}
            style={{ width: '2%' }}
          >
            <Divider className={styleModule.dividerHeader} type="vertical" />
          </div>
        </Draggable>
      </div>
    );
    //return <div style={style}>{HeaderTable[columnIndex]}</div>;
  }
);

const DatasourcesCheckBoxRow: FC<GridChildComponentProps> = observer(
  function DatasourcesCheckBoxRow({ columnIndex, rowIndex, style }) {
    const datasource = useMemo(() => datasourceTableService.getRow(rowIndex), [rowIndex]);
    const context = useContext(DragContext);
    const onSelect = useCallback(
      (event: CheckboxChangeEvent) => {
        if (datasource) {
          datasourceTableService.selectDataSource(datasource, event.target.checked);
        }
      },
      [datasource]
    );

    return (
      <Draggable
        axis="y"
        defaultClassName={styleModule.draggableColumnHeader}
        defaultClassNameDragging={styleModule.dragging}
        {...context}
        position={{ x: 0, y: 0 }}
      >
        <div id={rowIndex + '/-1'} style={style}>
          {datasource ? (
            <div className={styleModule.checkBoxDiv}>
              <Checkbox
                checked={
                  // datasourceTableService.selectedRows.filter(
                  //   chel => datasource.GUID === chel
                  // ).length > 0
                  false
                }
                className={styleModule.checkBox}
                onChange={onSelect}
              />
            </div>
          ) : null}
        </div>
      </Draggable>
    );
  }
);

const DatasourcesMoreMenuRow: FC<GridChildComponentProps> = observer(
  function DatasourcesMoreMenuRow({ columnIndex, rowIndex, style }) {
    const datasource = datasourceTableService.getRow(rowIndex);

    const onUpdate = useCallback(
      (name: string) => {
        if (datasource) {
          datasource.name = name;
          datasourceTableService.updateRow(rowIndex, datasource);
        }
      },
      [datasource, rowIndex]
    );

    return (
      <div style={style}>
        {datasource ? (
          <div className={styleModule.checkBoxDiv}>
            <MoreMenuRenderer
              className={styleModule.checkBox}
              datasource={datasource as any}
              onUpdate={onUpdate}
            />
          </div>
        ) : null}
      </div>
    );
  }
);
