import React, { FC } from 'react';

import { Select, SelectOption } from '../../../../../shared/Select/Select';
import { classNames } from '../../../../../utils/classNames';

import style from './SortSettings.module.scss';

type SortSettingsProps = {
  className?: string;
};

const sortTypes: SelectOption[] = [
  {
    label: 'Relevance',
    value: 'rel',
  },
  {
    label: 'Date',
    value: 'date',
  },
];

export const SortSettings: FC<SortSettingsProps> = function SortSettings({ className }) {
  return (
    <div className={classNames(className, style.root)}>
      <p className={style.label}>Sort by:</p>
      <Select options={sortTypes} />
    </div>
  );
};
