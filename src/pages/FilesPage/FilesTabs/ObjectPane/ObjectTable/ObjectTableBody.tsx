import { observer } from 'mobx-react-lite';
import React, { FC, useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';

import { useObjectContext } from '../ObjectContext';

import { useDragContext } from './DragContext';
import { ObjectTableHeader } from './ObjectTableHeader';

type Prop = {
  row: FixedSizeListProps['children'];
};

const Inner = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ children, style, ...rest }, ref) => {
    const { service, selectable } = useObjectContext();

    // Add header height
    const height = style?.height ?? 0 + 40;

    return (
      <div {...rest} ref={ref} style={{ ...style, height }}>
        <div
          style={{
            height: '100%',
            width: service.widthTable + (selectable ? 35 : 0),
          }}
        >
          <ObjectTableHeader />

          {children}
        </div>
      </div>
    );
  }
);

export const ObjectTableBody: FC<
  Prop & Omit<FixedSizeListProps, 'children' | 'innerElementType'>
> = observer(({ row, ...rest }) => {
  const { onScrollTable } = useDragContext();
  const { scrollToRef } = useObjectContext();

  const listRef = useRef<FixedSizeList>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const current = listContainerRef.current;

    current?.addEventListener('scroll', onScrollTable);

    return () => current?.removeEventListener('scroll', onScrollTable);
  }, [listContainerRef, onScrollTable]);

  const scrollTo = useCallback(
    (offset: number) => {
      listRef.current?.scrollTo(offset);
    },
    [listRef]
  );

  useEffect(() => {
    scrollToRef.current = scrollTo;
  }, [scrollTo, scrollToRef]);

  return (
    <FixedSizeList
      {...rest}
      ref={listRef}
      innerElementType={Inner}
      outerRef={listContainerRef}
      overscanCount={0}
    >
      {row}
    </FixedSizeList>
  );
});
