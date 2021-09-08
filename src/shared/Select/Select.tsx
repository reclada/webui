import { default as RCSelect, Option as RCOption } from 'rc-select';
import React, { FC, useState } from 'react';

import { ReactComponent as ArrowDown } from '../../resources/arrow-down.svg';
import { classNames } from '../../utils/classNames';

import style from './Select.module.scss';

type SelectProps = {
  className?: string;
  options: SelectOption[];
};

export type SelectOption = {
  label: string | number;
  value: string | number;
};

export const Select: FC<SelectProps> = function Select({ className, options }) {
  const [value, setValue] = useState(options[0].value);

  return (
    <div className={classNames(className, style.root)}>
      <RCSelect
        inputIcon={<ArrowDown className={style.arrow} />}
        showArrow={true}
        showSearch={false}
        value={value}
        onChange={setValue}
      >
        {options &&
          options.map((option, index) => (
            <RCOption key={index} value={option.value}>
              {option.label}
            </RCOption>
          ))}
      </RCSelect>
    </div>
  );
};
