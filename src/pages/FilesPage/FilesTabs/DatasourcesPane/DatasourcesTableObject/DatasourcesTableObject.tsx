import { Input, Popover } from 'antd';
import { observer } from 'mobx-react-lite';
import React, {
  FC,
  useRef,
  useState,
  useContext,
  useCallback,
  useLayoutEffect,
} from 'react';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';

import { ArticleType } from 'src/api/articleService';
import { IDatasource } from 'src/api/datasourcesService';
import { DateColumn } from 'src/pages/shared/DateColumn/DateColumn';
import { classNames } from 'src/utils/classNames';

import { OwnersRenderer } from '../../../../shared/OwnersRenderer/OwnersRenderer';
import { DragContext } from '../DatasorcesTable2/DatasourcesTable2';
import { datasourceTableService } from '../datasourceTable.service';
import { ArticleNameRenderer } from '../shared/ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from '../shared/ArticleTypeRenderer/ArticleTypeRenderer';

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
          onScroll={event => {
            console.log(event);
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
  const listConteinerRef = useRef(null);
  const [top, setTop] = useState(0);
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
        outerRef={listConteinerRef}
        onItemsRendered={props => {
          const style =
            listRef.current &&
            // @ts-ignore private method access
            listRef.current._getItemStyle(props.overscanStartIndex);

          setTop((style && style.top) || 0);

          // Call the original callback
          rest.onItemsRendered && rest.onItemsRendered(props);
        }}
      >
        {row}
      </FixedSizeList>
    </VirtualTableContext.Provider>
  );
});
