import React, { memo } from 'react';

import { BasicGridItem } from 'src/types/GridLayout';

import { GridLayout } from '../GridLayout';

interface SwitchProps {
  value: string | number | null | symbol | undefined;
  cases: Record<string | number | symbol, BasicGridItem>;
}

export const Switch = memo(({ value, cases }: SwitchProps) => {
  const layout = cases[String(value)];

  if (!layout) {
    return null;
  }

  return <GridLayout layout={layout} />;
});
