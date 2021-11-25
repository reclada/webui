import { Checkbox, Input, Popover } from 'antd';
import { observer } from 'mobx-react-lite';
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Draggable from 'react-draggable';
import { GridChildComponentProps } from 'react-window';

import { ArticleType } from 'src/api/articleService';
import { IDatasource } from 'src/api/datasourcesService';
import { DateColumn } from 'src/pages/shared/DateColumn/DateColumn';
import { classNames } from 'src/utils/classNames';

import { OwnersRenderer } from '../../../../shared/OwnersRenderer/OwnersRenderer';
import { RowContext } from '../DatasourcesTable/DatasourcesTable';
import { datasourceTableService } from '../datasourceTable.service';
import { ArticleNameRenderer } from '../shared/ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from '../shared/ArticleTypeRenderer/ArticleTypeRenderer';

import styleModule from './DatasourcesTableRowGrid.module.scss';

const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) => obj[key];

export const DatasourcesTableRowGrid: FC<GridChildComponentProps> = observer(
  function DatasourcesTableRowGrid({ columnIndex, rowIndex, isScrolling, style }) {
    const datasource = datasourceTableService.getRow(rowIndex);
    const context = useContext(RowContext);
    const columnRoot = useRef<null | HTMLDivElement>(null);

    const [edit, setEdit] = useState(false);

    if (!datasource && !isScrolling) {
      datasourceTableService.updateList(rowIndex);
    }

    useEffect(() => {
      if (columnRoot.current) {
        //@ts-ignore
        if (!datasource)
          context.setHeight(
            //@ts-ignore
            columnRoot.current.dataset.id,
            columnRoot.current.getBoundingClientRect().height
          );
      }
    }, [datasource, context]);

    useLayoutEffect(() => {
      if (columnRoot.current && !isScrolling && datasource) {
        //@ts-ignore
        context.setHeight(rowIndex, columnRoot.current.offsetHeight);
      }

      if (columnRoot.current && !isScrolling && datasource) {
        //@ts-ignore
        context.setWidth(columnIndex, columnRoot.current.offsetWidth);
      }
    }, [context, rowIndex, isScrolling, datasource, columnIndex]);

    const onClickActive = useCallback(() => {
      if (datasource && datasource.type === ArticleType.PDF) {
        datasourceTableService.setActiveRecord(datasource);
      }
    }, [datasource]);

    let content = null;

    let column = '';

    if (datasource) {
      column = datasourceTableService.getKeyByIndex(columnIndex);
      const attrData = datasourceTableService.getAttributeDataByIndex(columnIndex);

      switch (attrData.type) {
        case 'string':
          content = (
            <div ref={columnRoot} data-id={rowIndex}>
              {getKeyValue<keyof IDatasource, IDatasource>(column as keyof IDatasource)(
                datasource
              )}
            </div>
          );
          break;
        case 'date':
          content = (
            <DateColumn
              date={
                getKeyValue<keyof IDatasource, IDatasource>(column as keyof IDatasource)(
                  datasource
                ) as Date
              }
            />
          );
          break;
        case 'name':
          content = (
            <div onClick={onClickActive}>
              <ArticleNameRenderer
                className={styleModule.nameCard}
                title={
                  getKeyValue<keyof IDatasource, IDatasource>(
                    column as keyof IDatasource
                  )(datasource) as string
                }
              />
            </div>
          );
          break;
        case 'type':
          content = (
            <ArticleTypeRenderer
              articleType={
                getKeyValue<keyof IDatasource, IDatasource>(column as keyof IDatasource)(
                  datasource
                ) as ArticleType
              }
            />
          );
          break;
        case 'array':
          content = (
            <OwnersRenderer
              owners={
                getKeyValue<keyof IDatasource, IDatasource>(column as keyof IDatasource)(
                  datasource
                ) as string[]
              }
            />
          );
          break;
      }
    }

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
          <Popover content={content} trigger={'hover'}>
            <div
              // ref={refDiv}
              className={classNames(
                styleModule.rowTable,
                datasourceTableService.columnSelect === columnIndex
                  ? styleModule.draggingColumnHeader
                  : '',
                datasourceTableService.rowDragging === rowIndex
                  ? styleModule.draggingRow
                  : ''
              )}
              style={style}
              // onClick={event => {
              //   setEdit(true);
              //   // refDiv.current.f
              // }}
              onDoubleClick={event => {
                setEdit(true);
                // refDiv.current.f
              }}
            >
              {' '}
              <div ref={columnRoot} style={{ display: 'inline-block' }}>
                {content}
              </div>
            </div>
          </Popover>
        )}
      </>
    );
  }
);
