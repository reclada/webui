import { Checkbox } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { ReactElement } from 'react';
import Draggable from 'react-draggable';

import { ReactComponent as MoreIcon } from 'src/resources/more.svg';
import { classNames } from 'src/utils/classNames';

import { useObjectContext } from '../ObjectContext';

import { useDragContext } from './DragContext';
import styles from './ObjectTable.module.scss';

export const ObjectTableHeader = observer(
  (): ReactElement => {
    const { service, selectable } = useObjectContext();

    const context = useDragContext();

    const { orderColumn, columns } = service.listStore.tableDisplay;

    const content = orderColumn.map((column, i) => {
      const width = columns[column]?.width ?? 250;

      return (
        <Draggable
          axis="x"
          defaultClassName={styles.draggableColumnHeader}
          defaultClassNameDragging={styles.dragging}
          disabled={false}
          grid={[25, 0]}
          position={{ x: 0, y: 0 }}
          onStart={context.onStart}
          onStop={context.onStop}
        >
          <div
            key={column}
            className={classNames(styles.columnTable)}
            id={'-1/' + i}
            style={{
              width,
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
            }}
            // onDoubleClick={() => {
            //   service.setColumnCustomWidth(i, !!service.isColumnCustomWidth(i));
            // }}
          >
            <div style={{ width: '100%' }}>{columns[column]?.caption ?? ''}</div>

            {/* <Draggable
            axis="x"
            defaultClassName={styles.draggableDevider}
            defaultClassNameDragging={styles.dragging}
            {...context}
            position={{ x: 0, y: 0 }}
          > */}
            <MoreIcon fill="#536D85" height={17} width={17} />
            {/* </Draggable> */}
          </div>
        </Draggable>
      );
    });

    return (
      <div
        className={styles.headTable}
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {selectable && (
          <div
            className={classNames(styles.columnTable)}
            style={{ width: '35px', position: 'relative' }}
          >
            <Checkbox
              checked={service.selectedRows.length > 0}
              className={styles.checkBox}
              disabled={true}
            />
          </div>
        )}

        {content}

        {/* <div
          className={classNames(styles.columnTable)}
          style={{
            minWidth: '50px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <MoreIcon fill="#536D85" height={17} width={17} />
        </div> */}
      </div>
    );
  }
);
