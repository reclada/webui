import { observer } from 'mobx-react-lite';
import React, { useCallback, useRef } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';
import AutoSizer from 'react-virtualized-auto-sizer';

import { useObjectContext } from '../ObjectContext';

import { DragContext } from './DragContext';
import { ObjectTableBody } from './ObjectTableBody';
import { ObjectTableRow } from './ObjectTableRow';

export const ObjectTable = observer(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectable, service } = useObjectContext();

  const onStartDrag = useCallback(
    (event: DraggableEvent, data: DraggableData) => {
      const ids = data.node.id.split('/') as string[];

      if (ids[0] === '-1') service.selectColumn?.(+ids[1]);

      // FIXME: DnD for rows
      // if (ids[1] === '-1') service.setRowDragging?.(+ids[0]);
    },
    [service]
  );

  const onStopDrag = useCallback(
    (event: DraggableEvent, data: DraggableData) => {
      const ids = data.node.id.split('/') as string[];

      service.selectColumn?.(undefined);
      // service.setRowDragging(undefined);

      // FIXME: custom width of column
      // if (ids[0] === 'devider-column') {
      //   service.setColumnWidth?.(+ids[1], data.x);

      //   return;
      // }

      if (ids[0] === '-1') service.setColumnOrder?.(+ids[1], data.x);

      // FIXME: DnD for rows
      // if (+ids[0] >= 0) service.setOrderRow?.(+ids[0]);
    },
    [service]
  );

  const onScrollTable = useCallback(
    event => {
      containerRef.current?.scrollTo(event.target.scrollLeft, 0);

      const y = event.target.scrollTop;

      const index = Math.max((y - 40) / 65, 0);
      const page = Math.floor(index / service.pageSize);

      service.listStore.setCurrentPage(page);
    },
    [service.listStore, service.pageSize]
  );

  return (
    <DragContext.Provider
      value={{ onStart: onStartDrag, onStop: onStopDrag, onScrollTable }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          maxWidth: service.widthTable + (selectable ? 35 : 0),
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <ObjectTableBody
              height={height}
              itemCount={service.count}
              itemSize={65}
              row={ObjectTableRow}
              style={{ overflowX: 'scroll' }}
              useIsScrolling={true}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    </DragContext.Provider>
  );
});
