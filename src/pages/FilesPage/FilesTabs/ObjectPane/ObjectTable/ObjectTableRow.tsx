import { Checkbox } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo } from 'react';
import Draggable from 'react-draggable';
import { ListChildComponentProps } from 'react-window';

import { useObjectContext } from '../ObjectContext';

import { useDragContext } from './DragContext';
import styles from './ObjectTable.module.scss';
import { ObjectTableCell } from './ObjectTableCell';

export const ObjectTableRow = observer(
  ({ index, isScrolling, style: { width: _, ...style } }: ListChildComponentProps) => {
    const { service, selectable } = useObjectContext();
    const { orderColumn } = service.listStore.tableDisplay;

    const object = service.getRow(index);

    useEffect(() => {
      if (!object && !isScrolling) {
        service.updateList(index);
      }
    }, [index, isScrolling, object, service]);

    const onUpdate = useCallback(
      (name: string) => {
        if (object) {
          service.updateRow(index, { ...object, '{attributes,name}': name });
        }
      },
      [object, service, index]
    );

    const onSelect = useCallback(() => {
      if (object) {
        service.toggleSelection(object['{GUID}']);
      }
    }, [object, service]);

    const context = useDragContext();

    const cells = useMemo(
      () =>
        orderColumn.map((column, i) => (
          <ObjectTableCell
            key={column}
            column={column}
            id={index + '/' + i}
            isLastCell={i === orderColumn.length - 1}
            object={object}
            onUpdate={onUpdate}
          />
        )),
      [index, object, onUpdate, orderColumn]
    );

    const checked = object ? service.getIsObjectSelected(object['{GUID}']) : false;

    // Add offset to items with header height
    const top = Number(style?.top ?? 0) + 40;

    return (
      <Draggable
        axis="y"
        defaultClassNameDragging={styles.dragging}
        handle="strong"
        {...context}
        position={{ x: 0, y: 0 }}
      >
        <div className={styles.tableRow} id={index + '/-1'} style={{ ...style, top }}>
          {selectable && (
            <div
              className={styles.tableCell}
              id={index + '/-1'}
              style={{ width: '35px', minWidth: '35px' }}
            >
              {object && <Checkbox checked={checked} onChange={onSelect} />}
            </div>
          )}

          {cells}
        </div>
      </Draggable>
    );
  }
);
