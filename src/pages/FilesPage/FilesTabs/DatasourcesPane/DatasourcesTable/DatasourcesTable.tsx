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
} from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { GridChildComponentProps, VariableSizeGrid } from 'react-window';

import { InfiniteGrid } from 'src/shared/InfinitrGrid/InfiniteGrid';
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
      //mainFixedGrid.current?.resetAfterColumnIndex(+ids[1]);
      staticGridHeader.current?.resetAfterColumnIndex(+ids[1]);

      return;
    }

    if (ids[0] === '-1') datasourceTableService.setColumnOrder(+ids[1], data.x);

    // if (+ids[0] >= 0) datasourceTableService.setOrderRow(+ids[0], data.y);
  }, []);

  const getColumnWidth = (columnIndex: number) => {
    return datasourceTableService.getAttributeDataByIndex(columnIndex).width;
  };

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
          <InfiniteGrid
            ref={staticGridHeader}
            columnCount={7}
            columnWidth={getColumnWidth}
            rowCount={1}
            rowHeight={(index: number) => 52.25}
            style={{ overflowX: 'hidden' }}
          >
            {DatasourcesTableHeader}
          </InfiniteGrid>
          {/* <DatasourcesTableObjectHeader /> */}
        </div>
        <div style={{ width: '45px' }}></div>
      </div>
      <div className={styleModule.table}>
        <div style={{ width: '35px' }}>
          <InfiniteGrid
            ref={leftFixedGrid}
            columnCount={1}
            columnWidth={(index: number) => 30}
            rowCount={datasourceTableService.count}
            rowHeight={(index: number) => 55}
            style={{ overflowY: 'hidden' }}
          >
            {DatasourcesCheckBoxRow}
          </InfiniteGrid>
        </div>
        <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
          <InfiniteGrid
            ref={mainFixedGrid}
            columnCount={7}
            columnWidth={getColumnWidth}
            rowCount={datasourceTableService.count}
            rowHeight={(index: number) => 55}
            onScroll={onScroll}
          >
            {DatasourcesTableRowGrid}
          </InfiniteGrid>
        </div>
        <div style={{ width: '35px' }}>
          <InfiniteGrid
            ref={rightFixedGrid}
            columnCount={1}
            columnWidth={(index: number) => 35}
            rowCount={datasourceTableService.count}
            rowHeight={(index: number) => 55}
            style={{ overflowY: 'hidden' }}
          >
            {DatasourcesMoreMenuRow}
          </InfiniteGrid>
        </div>
      </div>
    </DragContext.Provider>
  );
});

const DatasourcesTableHeader: FC<GridChildComponentProps> = observer(
  function DatasourcesTableHeader({ columnIndex, rowIndex, style }) {
    const context = useContext(DragContext);

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
                  datasourceTableService.selectedRows.filter(
                    chel => datasource.GUID === chel
                  ).length > 0
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
              datasource={datasource}
              onUpdate={onUpdate}
            />
          </div>
        ) : null}
      </div>
    );
  }
);
