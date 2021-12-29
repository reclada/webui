import { Input, Popover } from 'antd';
import { set } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, {
  FC,
  useRef,
  useState,
  useContext,
  useCallback,
  useLayoutEffect,
} from 'react';
import { FixedSizeList, FixedSizeListProps, ListOnScrollProps } from 'react-window';

import { DragContext } from '../DatasorcesTable2/DatasourcesTable2';
import { datasourceTableService } from '../datasourceTable.service';

type Prop = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  row: FixedSizeListProps['children'];
};

const VirtualTableContext = React.createContext<{
  top: number;
  setTop: (top: number) => void;
  header: React.ReactNode;
  footer: React.ReactNode;
}>({
  top: 0,
  setTop: (value: number) => {},
  header: <></>,
  footer: <></>,
});

const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) => obj[key];

const Inner = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function Inner({ children, ...rest }, ref) {
    const { header, footer, top } = useContext(VirtualTableContext);

    return (
      <div {...rest} ref={ref}>
        <table
          style={{
            top,
            position: 'absolute',
            height: '100%',
            tableLayout: 'auto',
            width: datasourceTableService.widthTable + 35,
          }}
        >
          {header}
          <tbody>{children}</tbody>
          {footer}
        </table>
      </div>
    );
  }
);

export const DatasourcesTableObject: FC<
  Prop & Omit<FixedSizeListProps, 'children' | 'innerElementType'>
> = observer(function InfintyTable({ header, footer, row, ...rest }) {
  const mainContext = useContext(DragContext);
  const listRef = useRef<FixedSizeList | null>();
  // const [currentItem, setCurrentItem] = useState(0);
  const listConteinerRef = useRef(null);
  const [top, setTop] = useState(0);

  // const onScroll = useCallback((prop: ListOnScrollProps) => {
  //   setTop(prop.scrollOffset);
  // }, []);
  // @ts-ignore
  const listScroll = useCallback(
    event => {
      mainContext.onScrollTable(event);
    },
    [mainContext]
  );

  useLayoutEffect(() => {
    if (listConteinerRef) {
      // @ts-ignore
      const current = listConteinerRef.current;

      // @ts-ignore
      current.addEventListener('scroll', listScroll);

      return () =>
        // @ts-ignore
        current.removeEventListener('scroll', listScroll);
    }
  }, [listConteinerRef, listScroll]);

  return (
    <VirtualTableContext.Provider value={{ top, setTop, header, footer }}>
      <FixedSizeList
        {...rest}
        ref={el => (listRef.current = el)}
        innerElementType={Inner}
        // itemSize={(index: number) => 36}
        outerRef={listConteinerRef}
        overscanCount={0}
        // onItemsRendered={props => {
        //   const style =
        //     listRef.current &&
        //     // @ts-ignore private method access
        //     listRef.current._getItemStyle(props.overscanStartIndex);

        //   // console.log(style ? style.top : 0);
        //   // setTop((style && style.top) || 0);
        //   // Call the original callback
        //   rest.onItemsRendered && rest.onItemsRendered(props);
        // }}
        // onScroll={onScroll}
      >
        {row}
      </FixedSizeList>
    </VirtualTableContext.Provider>
  );
});
