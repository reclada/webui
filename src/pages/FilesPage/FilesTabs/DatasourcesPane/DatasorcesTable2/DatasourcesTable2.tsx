import { Checkbox, Divider, Input } from 'antd';
import result from 'antd/lib/result';
import { observer } from 'mobx-react-lite';
import React, {
  createContext,
  FC,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps } from 'react-window';

import { ArticleType } from 'src/api/articleService';
import { IDatasource } from 'src/api/datasourcesService';
import { DateColumn } from 'src/pages/shared/DateColumn/DateColumn';
import { OwnersRenderer } from 'src/pages/shared/OwnersRenderer/OwnersRenderer';
import { classNames } from 'src/utils/classNames';

import { DatasourcesTableObject } from '../DatasourcesTableObject/DatasourcesTableObject';
import { datasourceTableService } from '../datasourceTable.service';
import { ArticleNameRenderer } from '../shared/ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from '../shared/ArticleTypeRenderer/ArticleTypeRenderer';

import styleModule from './DatasourcesTable2.module.scss';

const defContextHeader = {
  onStart: (event: DraggableEvent, data: DraggableData) => {},
  onStop: (event: DraggableEvent, data: DraggableData) => {},
  onScrollTable: (event: any) => {},
};

const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) => obj[key];

export const DragContext = createContext(defContextHeader);

export const DatasourcesTable2 = observer(function DatasourcesTable2() {
  const onStartDrag = useCallback((event: DraggableEvent, data: DraggableData) => {
    const ids = data.node.id.split('/') as string[];

    if (ids[0] === '-1') datasourceTableService.setColumnSelect(+ids[1]);

    if (ids[1] === '-1') datasourceTableService.setRowDragging(+ids[0]);
  }, []);
  const onStopDrag = useCallback((event: DraggableEvent, data: DraggableData) => {
    const ids = data.node.id.split('/') as string[];

    datasourceTableService.setColumnSelect(undefined);
    // datasourceTableService.setRowDragging(undefined);

    if (ids[0] === 'devider-column') {
      datasourceTableService.setColumnWidth(+ids[1], data.x);

      return;
    }

    if (ids[0] === '-1') datasourceTableService.setColumnOrder(+ids[1], data.x);

    if (+ids[0] >= 0) datasourceTableService.setOrderRow(+ids[0]);
  }, []);

  const header: ReactNode[] = [];

  for (let i = 0; i < 7; i++) {
    const attr = datasourceTableService.getAttributeDataByIndex(i);
    const width = datasourceTableService.isColumnCustomWidth(i)
      ? attr.maxWidth
      : attr.width;

    header.push(<th style={{ width: width }}></th>);
  }
  const containerRef = useRef(null);
  const onScrollTable = useCallback(event => {
    //@ts-ignore
    containerRef.current.scrollTo(event.target.scrollLeft * 2, 0);
  }, []);

  return (
    <DragContext.Provider
      value={{
        onStop: onStopDrag,
        onStart: onStartDrag,
        onScrollTable: onScrollTable,
      }}
    >
      {/* <div className={styleModule.table}> */}
      <div
        //ref={containerRef}
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <>
              <div
                ref={containerRef}
                className={styleModule.headTable}
                style={{ width, overflow: 'hidden' }}
              >
                <DatasourcesTableObjectHeader />
              </div>
              <DatasourcesTableObject
                header={<TableTHead />}
                height={height * 0.9}
                itemCount={datasourceTableService.count}
                itemSize={36}
                row={RowDataSources}
                style={{ overflowX: 'scroll' }}
                useIsScrolling={true}
                width={width}
              />
            </>
          )}
        </AutoSizer>
      </div>
      {/* </div> */}
    </DragContext.Provider>
  );
});

type headerProp = {
  className?: string;
};

const DatasourcesTableObjectHeader: FC<headerProp> = memo(
  observer(function DatasourcesTableHeader({ className }) {
    const context = useContext(DragContext);

    let content = [];

    for (let i = 0; i < 7; i++) {
      const className =
        datasourceTableService.columnSelect === i ? styleModule.draggingColumnHeader : '';

      content.push(
        <div
          key={i}
          className={classNames(styleModule.columnTable, styleModule.columnHeader)}
          style={{
            width: datasourceTableService.isColumnCustomWidth(i)
              ? datasourceTableService.getAttributeDataByIndex(i).maxWidth
              : datasourceTableService.getAttributeDataByIndex(i).width,
            display: 'flex',
          }}
          onDoubleClick={() => {
            datasourceTableService.setColumnCustomWidth(
              i,
              !!datasourceTableService.isColumnCustomWidth(i)
            );
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
              id={'-1/' + i}
              style={{ width: '100%' }}
            >
              {datasourceTableService.getAttributeDataByIndex(i).caption}
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
              id={'devider-column/' + i}
              style={{ width: '2%' }}
            >
              <Divider className={styleModule.dividerHeader} type="vertical" />
            </div>
          </Draggable>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex' }}>
        <div
          className={classNames(styleModule.columnTable, styleModule.columnHeader)}
          style={{ width: '35px' }}
        >
          <Checkbox
            checked={datasourceTableService.selectedRows.length > 0}
            className={styleModule.checkBox}
            disabled={true}
          />
          <Divider className={styleModule.dividerHeader} type="vertical" />
        </div>
        {content}
      </div>
    );
  })
);

const TableTHead: FC = observer(function TableTHead() {
  const result = [];

  for (let i = 0; i < 7; i++) {
    const attr = datasourceTableService.getAttributeDataByIndex(i);
    const width = datasourceTableService.isColumnCustomWidth(i)
      ? attr.maxWidth
      : attr.width;

    result.push(<th style={{ width: width }}></th>);
  }

  return (
    <thead>
      <tr>
        <th style={{ width: '35px' }}></th>
        {result}
      </tr>
    </thead>
  );
});

const RowDataSources: FC<ListChildComponentProps> = memo(
  observer(function DatasourcesTableRowGrid({ index, isScrolling, style }) {
    const datasource = datasourceTableService.getRow(index);

    const [edit, setEdit] = useState(false);
    const refTR = useRef(null);

    if (!datasource && !isScrolling) {
      datasourceTableService.updateList(index);
    }

    const onClickActive = useCallback(() => {
      if (datasource && datasource.type === ArticleType.PDF) {
        datasourceTableService.setActiveRecord(datasource);
      }
    }, [datasource]);

    let content = [];
    const context = useContext(DragContext);
    let column = '';

    if (datasource) {
      for (let i = 0; i < 7; i++) {
        column = datasourceTableService.getKeyByIndex(i);
        const attrData = datasourceTableService.getAttributeDataByIndex(i);

        switch (attrData.type) {
          case 'string':
            content.push(
              <td
                key={i}
                // ref={datasourceTableService.isColumnCustomWidth(i) ? refTD : null}
                id={index + '/' + i}
              >
                <div>
                  {getKeyValue<keyof IDatasource, IDatasource>(
                    column as keyof IDatasource
                  )(datasource)}
                </div>
              </td>
            );
            break;
          case 'date':
            content.push(
              <td key={i}>
                {index}
                <DateColumn
                  date={
                    getKeyValue<keyof IDatasource, IDatasource>(
                      column as keyof IDatasource
                    )(datasource) as Date
                  }
                />
              </td>
            );
            break;
          case 'name':
            content.push(
              <td key={i}>
                <div onClick={onClickActive}>
                  <ArticleNameRenderer
                    //   className={styleModule.nameCard}
                    title={
                      getKeyValue<keyof IDatasource, IDatasource>(
                        column as keyof IDatasource
                      )(datasource) as string
                    }
                  />
                </div>
              </td>
            );
            break;
          case 'type':
            content.push(
              <td key={i}>
                <ArticleTypeRenderer
                  articleType={
                    getKeyValue<keyof IDatasource, IDatasource>(
                      column as keyof IDatasource
                    )(datasource) as ArticleType
                  }
                />
              </td>
            );
            break;
          case 'array':
            content.push(
              <td key={i}>
                <OwnersRenderer
                  owners={
                    getKeyValue<keyof IDatasource, IDatasource>(
                      column as keyof IDatasource
                    )(datasource) as string[]
                  }
                />
              </td>
            );
            break;
        }
      }
    }
    //console.log('render');

    return (
      <>
        {edit && datasource ? (
          <Input
            autoFocus={true}
            defaultValue={
              getKeyValue<keyof IDatasource, IDatasource>(column as keyof IDatasource)(
                datasource
              ) as string
            }
            style={style}
            onBlur={() => {
              setEdit(false);
            }}
          ></Input>
        ) : (
          // <Popover content={content} trigger={'hover'}>
          <Draggable
            axis="y"
            defaultClassNameDragging={styleModule.dragging}
            handle="strong"
            {...context}
            position={{ x: 0, y: 0 }}
          >
            <tr
              ref={refTR}
              className={datasource ? styleModule.tableRow : ''}
              id={index + '/-1'}
              //id={index.toString()}
              onMouseOver={() => {
                if (datasourceTableService.rowDragging !== undefined) {
                  datasourceTableService.setRowForSwap(index);
                }
              }}
            >
              {' '}
              <td id={index + '/-1'}>
                {datasource ? (
                  <strong
                    style={{ display: 'inline-block', height: '100%', width: '100%' }}
                  >
                    <div className={styleModule.checkBoxDiv}>
                      <Checkbox
                        checked={
                          datasourceTableService.selectedRows.filter(
                            chel => datasource.GUID === chel
                          ).length > 0
                        }
                        className={styleModule.checkBox}
                        // onChange={onSelect}
                      />
                    </div>
                  </strong>
                ) : null}
              </td>
              {content}
            </tr>
          </Draggable>
          // </Popover>
        )}
      </>
    );
  })
);
