import React, { memo, ReactElement } from 'react';

import { Value } from 'src/api/IRecladaObject';
import { CellRendererProps } from 'src/types/CellRenderer';

interface TableProps {
  columns: {
    name: string;
    caption: string;
    width: number;
    cellRenderer: (props: CellRendererProps<Value>) => ReactElement;
    headerRenderer: (props: unknown) => ReactElement;
  }[];
  data: Record<string, Value>[];
}

export const Table = memo(({ columns, data }: TableProps) => {
  return <></>;
});
