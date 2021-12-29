import { default as RCSelect, Option as RCOption } from 'rc-select';
import { OptionsType, OptionData, OptionGroupData } from 'rc-select/lib/interface';
import React, { FC } from 'react';

import { ReactComponent as ArrowDown } from '../../resources/arrow-down.svg';

import style from './Select.module.scss';

type SelectProps = {
  value: string | number;
  className?: string;
  options: SelectOption[];
  onChange: (
    value: string | number,
    option: OptionsType | OptionData | OptionGroupData
  ) => void;
};

export type SelectOption = {
  label: string | number;
  value: string | number;
};

export const Select: FC<SelectProps> = ({ value, className, options, onChange }) => (
  <div className={className}>
    <RCSelect
      dropdownMatchSelectWidth={false}
      inputIcon={<ArrowDown className={style.arrow} height={16} width={16} />}
      showArrow
      showSearch={false}
      value={value}
      onChange={onChange}
    >
      {options?.map((option, index) => (
        <RCOption key={index} value={option.value}>
          {option.label}
        </RCOption>
      ))}
    </RCSelect>
  </div>
);
