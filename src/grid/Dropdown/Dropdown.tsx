import { Dropdown as AntDropdown, DropDownProps as AntDropdownProps } from 'antd';
import React, { memo, useMemo } from 'react';

import { BasicGridItem } from 'src/types/GridLayout';

import { GridLayout } from '../GridLayout';

type DropdownProps = Omit<AntDropdownProps, 'overlay' | 'children'> & {
  overlay: BasicGridItem;
  children: string | BasicGridItem | BasicGridItem[];
};

export const Dropdown = memo(
  ({ overlay, children, className, ...props }: DropdownProps) => {
    const content = useMemo(() => {
      if (typeof children === 'string') {
        return children;
      }

      if (Array.isArray(children)) {
        return children.map((child, index) => <GridLayout key={index} layout={child} />);
      }

      return <GridLayout layout={children} />;
    }, [children]);

    return (
      <AntDropdown overlay={<GridLayout layout={overlay} />} {...props}>
        <div className={className}>{content}</div>
      </AntDropdown>
    );
  }
);

Dropdown.displayName = 'Dropdown';
