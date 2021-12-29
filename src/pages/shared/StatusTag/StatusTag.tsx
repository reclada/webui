import { Tag } from 'antd';
import React, { memo } from 'react';

import { CellRendererProps } from 'src/types/CellRenderer';

const colorsMap = {
  active: '#0A93F5',
  canceled: '#E87575',
};

export const StatusTag = memo(({ value }: CellRendererProps<string | number>) => {
  const color = colorsMap[value as keyof typeof colorsMap] ?? colorsMap.active;

  return <Tag color={color}>{value}</Tag>;
});
