import format from 'date-fns/format';
import React, { FC, memo } from 'react';

import { CellRendererProps } from 'src/types/CellRenderer';

export const DateColumn: FC<CellRendererProps<Date>> = memo(({ value }) => {
  const formattedDate = format(value, 'd MMM yyyy');

  return <div>{formattedDate}</div>;
});
