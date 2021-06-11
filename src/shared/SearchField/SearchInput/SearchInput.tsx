import Select, { Option } from 'rc-select';
import { OptionData, OptionGroupData, OptionsType } from 'rc-select/lib/interface';
import React, { FC, RefObject, useCallback, useEffect, useState } from 'react';

import { fetchSuggestions, ISuggestion } from '../../../api/suggestionService';
import { classNames } from '../../../utils/classNames';

import style from './SearchInput.module.scss';

const KEYS = {
  Backspace: 'Backspace',
};

type SearchInputProps = {
  className?: string;
  tagText: string;
  onTextSelect: (val: string) => void;
  onSuggestionSelect: (val: ISuggestion) => void;
  inputRef: RefObject<HTMLInputElement>;
  onGoPrev?: () => void;
  onGoNext?: () => void;
  onRemovePrev: () => void;
};

export const SearchInput: FC<SearchInputProps> = function SearchInput({
  className,
  tagText,
  onSuggestionSelect,
  onTextSelect,
  inputRef,
  onRemovePrev,
  onGoPrev,
}) {
  const [data, setData] = useState<ISuggestion[]>([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(tagText);
  }, [tagText]);

  const onChange = useCallback(
    (text, option: OptionData | OptionsType | OptionGroupData) => {
      if (!Array.isArray(option) && option.key !== undefined) {
        // it is onSelect event

        const suggestion = data[Number(option.key)]!;

        setValue(suggestion.text);
        onSuggestionSelect(suggestion);
      } else {
        // it is onChange event
        console.info('onChange', text, option);
        setValue(text);

        if (text.toUpperCase() === 'OR ' || text.toUpperCase() === 'AND ') {
          onTextSelect(text);

          return;
        }

        const query = text.trim();

        if (query) {
          fetchSuggestions(text).then(suggestions => {
            console.info('fetch', suggestions);
            setData(suggestions.Suggestions || []);
          });
        } else {
          setData([]);
        }
      }
    },
    [data, onSuggestionSelect, onTextSelect]
  );

  const onBlur = useCallback(() => {
    const text = value.trim();

    if (text) {
      onTextSelect(text);
    }
  }, [value, onTextSelect]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      console.info('onKeyDown', event);
      const cursorPosition = inputRef.current?.selectionStart;
      const isNoSelection =
        inputRef.current?.selectionStart === inputRef.current?.selectionEnd;

      switch (event.key) {
        case KEYS.Backspace:
          if (cursorPosition === 0 && isNoSelection) {
            onRemovePrev();
          }

          return;
      }
    },
    [inputRef, onRemovePrev]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <div className={classNames(className, style.root)}>
      <div onKeyDown={onKeyDown}>
        <Select
          defaultActiveFirstOption={true}
          dropdownClassName="search-input-dropdown"
          filterOption={false}
          getInputElement={() => <input ref={inputRef} />}
          mode="combobox"
          notFoundContent=" "
          placeholder=""
          showArrow={false}
          style={{ width: '100%' }}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={() => console.info('focus')}
        >
          {data.map((val, index) => (
            <Option key={index} value={val.text}>
              <div className={style.suggestOption}>
                <p className={style.suggestLabel}>{val.text}</p>
                <span className={style.suggestGroup}>Group: {val.group}</span>
              </div>
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};
