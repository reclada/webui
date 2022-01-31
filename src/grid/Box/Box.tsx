import React, { ReactElement, useMemo } from 'react';

import { BasicGridItem } from 'src/types/GridLayout';

import { GridLayout } from '../GridLayout';

interface Props {
  children: BasicGridItem | BasicGridItem[] | string;
  className?: string;
}

export const Box = ({ children, className }: Props): ReactElement => {
  const content = useMemo(() => {
    if (typeof children === 'string') {
      return children;
    }

    if (Array.isArray(children)) {
      return children.map((child, index) =>
        typeof child === 'string' ? child : <GridLayout key={index} layout={child} />
      );
    }

    return <GridLayout layout={children} />;
  }, [children]);

  return <div className={className}>{content}</div>;
};
