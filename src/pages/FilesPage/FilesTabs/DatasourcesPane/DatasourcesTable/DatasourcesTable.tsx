import { Col, Divider, Result, Row, Checkbox, Spin } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  GridChildComponentProps,
  VariableSizeGrid,
  VariableSizeGridProps,
} from 'react-window';

import { InfiniteGrid } from 'src/shared/InfinitrGrid/InfiniteGrid';

import { DatasourcesTableRowGrid } from '../DatasourcesTableRowGrid/DatasourcesTableRowGrid';
import { datasourceTableService } from '../datasourceTable.service';
import { MoreMenuRenderer } from '../shared/MoreMenuRenderer/MoreMenuRenderer';

import styleModule from './DatasourcesTable.module.scss';

export const DatasourcesTable = observer(function DatasourcesTable() {
  const staticGridHeader = useRef<VariableSizeGrid>(null);
  const leftFixedGrid = useRef<VariableSizeGrid>(null);
  const rightFixedGrid = useRef<VariableSizeGrid>(null);
  const onScroll = useCallback(({ scrollLeft, scrollTop, scrollUpdateWasRequested }) => {
    if (!scrollUpdateWasRequested) {
      staticGridHeader.current?.scrollTo({ scrollLeft, scrollTop: 0 });
      leftFixedGrid.current?.scrollTo({ scrollLeft: 0, scrollTop });
      rightFixedGrid.current?.scrollTo({ scrollLeft: 0, scrollTop });
    }
  }, []);

  return (
    <>
      <div className={styleModule.headTable}>
        <div style={{ width: '35px' }}>
          <Checkbox
            checked={datasourceTableService.selectedRows.length > 0}
            className={styleModule.checkboxCard}
            disabled={true}
          />
          <Divider className={styleModule.dividerHeader} type="vertical" />
        </div>
        <div style={{ width: '100%', height: '100%' }}>
          <InfiniteGrid
            ref={staticGridHeader}
            columnCount={7}
            columnWidth={(index: number) => {
              return index === 0 ? 100 : 250;
            }}
            rowCount={1}
            rowHeight={(index: number) => 30}
            style={{ overflowX: 'hidden' }}
          >
            {DatasourcesTableHeader}
          </InfiniteGrid>
        </div>
        <div style={{ width: '30px' }}></div>
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
        <div style={{ width: '100%', height: '100%' }}>
          <InfiniteGrid
            columnCount={7}
            columnWidth={(index: number) => {
              return index === 0 ? 100 : 250;
            }}
            rowCount={datasourceTableService.count}
            rowHeight={(index: number) => 55}
            onScroll={onScroll}
          >
            {DatasourcesTableRowGrid}
          </InfiniteGrid>
        </div>
        <div style={{ width: '30px' }}>
          <InfiniteGrid
            ref={rightFixedGrid}
            columnCount={1}
            columnWidth={(index: number) => 30}
            rowCount={datasourceTableService.count}
            rowHeight={(index: number) => 55}
            style={{ overflowY: 'hidden' }}
          >
            {DatasourcesMoreMenuRow}
          </InfiniteGrid>
        </div>
      </div>
    </>
  );
});

const HeaderTable = [
  // <div>
  //   <Checkbox
  //     checked={datasourceTableService.selectedRows.length > 0}
  //     className={style.checkboxCard}
  //     disabled={true}
  //   />
  //   <Divider className={style.dividerHeader} type="vertical" />
  // </div>,
  <div className={styleModule.columnTable}>
    Type <Divider className={styleModule.dividerHeader} type="vertical" />
  </div>,
  <div className={styleModule.columnTable}>
    Name <Divider className={styleModule.dividerHeader} type="vertical" />
  </div>,
  <div className={styleModule.columnTable}>
    Create date <Divider className={styleModule.dividerHeader} type="vertical" />
  </div>,
  <div className={styleModule.columnTable}>
    Author <Divider className={styleModule.dividerHeader} type="vertical" />
  </div>,
  <div className={styleModule.columnTable}>
    Last update <Divider className={styleModule.dividerHeader} type="vertical" />
  </div>,
  <div className={styleModule.columnTable}>
    Who updated <Divider className={styleModule.dividerHeader} type="vertical" />
  </div>,
  <div className={styleModule.columnTable}>
    Owners <Divider className={styleModule.dividerHeader} type="vertical" />
  </div>,
];

const DatasourcesTableHeader: FC<GridChildComponentProps> = function DatasourcesTableHeader({
  columnIndex,
  rowIndex,
  style,
}) {
  return <div style={style}>{HeaderTable[columnIndex]}</div>;
};

const DatasourcesCheckBoxRow: FC<GridChildComponentProps> = observer(
  function DatasourcesCheckBoxRow({ columnIndex, rowIndex, style }) {
    const datasource = useMemo(() => datasourceTableService.getRow(rowIndex), [rowIndex]);

    const onSelect = useCallback(
      (event: CheckboxChangeEvent) => {
        if (datasource) {
          datasourceTableService.selectDataSource(datasource, event.target.checked);
        }
      },
      [datasource]
    );

    return (
      <div style={style}>
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
    );
  }
);

const DatasourcesMoreMenuRow: FC<GridChildComponentProps> = observer(
  function DatasourcesMoreMenuRow({ columnIndex, rowIndex, style }) {
    const datasource = useMemo(() => datasourceTableService.getRow(rowIndex), [rowIndex]);

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
