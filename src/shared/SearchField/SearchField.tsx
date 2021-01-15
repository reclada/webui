import React, { useCallback, useRef, useState } from 'react';

import { ISuggestion } from '../../api/suggestionService';
import { classNames } from '../../utils/classNames';

import style from './SearchField.module.scss';
import { ISearchFieldElement, SearchTagType } from './SearchFieldService';
import { SearchInput } from './SearchInput/SearchInput';
import { SearchTag } from './SearchTag/SearchTag';

export const SearchField: React.FC<{
  className: string;
  provideSearchData: (val: string) => void;
}> = function SearchField({ className, provideSearchData }) {
  const [data, setData] = useState<ISearchFieldElement[]>([
    {
      id: getId(),
      type: SearchTagType.InProgress,
      text: '',
    },
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onTextSelect = useCallback(
    (val: string) => {
      setData(oldData => {
        const index = oldData.findIndex(val => val.type === SearchTagType.InProgress);

        const text = val.trim();
        const isOperator = text.toUpperCase() === 'OR' || text.toUpperCase() === 'AND';

        oldData.splice(
          index,
          1,
          {
            id: getId(),
            type: isOperator ? SearchTagType.Operator : SearchTagType.String,
            text: text,
          },
          {
            id: getId(),
            type: SearchTagType.InProgress,
            text: '',
          }
        );
        console.info('onTextSelect', oldData);
        provideSearchData(text);

        return [...oldData];
      });
    },
    [provideSearchData]
  );

  const onSuggestionSelect = useCallback(
    (val: ISuggestion) => {
      setData(oldData => {
        const index = oldData.findIndex(val => val.type === SearchTagType.InProgress);

        oldData.splice(
          index,
          1,
          {
            id: getId(),
            type: SearchTagType.Token,
            text: val.text,
          },
          {
            id: getId(),
            type: SearchTagType.InProgress,
            text: '',
          }
        );

        console.info('onSuggestionSelect', oldData);
        provideSearchData(val.text);

        return [...oldData];
      });
    },
    [provideSearchData]
  );

  const onRemove = useCallback((id: string) => {
    setData(oldData => {
      console.info('onRemove', oldData);

      return oldData.filter(item => item.id !== id);
    });
  }, []);

  const onRemovePrev = useCallback(() => {
    setData(oldData => {
      const index = oldData.findIndex(val => val.type === SearchTagType.InProgress);

      console.info('onRemovePrev', oldData);

      if (index > 0) {
        return oldData.filter((_, i) => i !== index - 1);
      }

      return oldData;
    });
  }, []);

  return (
    <div className={classNames(className, style.root)}>
      {data.map(item => {
        if (item.type === SearchTagType.InProgress) {
          return (
            <SearchInput
              key={item.id}
              inputRef={inputRef}
              tagText={item.text}
              onRemovePrev={onRemovePrev}
              onSuggestionSelect={onSuggestionSelect}
              onTextSelect={onTextSelect}
            />
          );
        }

        return (
          <SearchTag
            key={item.id}
            tag={item.text}
            tagId={item.id}
            tagType={item.type}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
};

let counter = 0;

function getId() {
  counter += 1;

  return String(counter);
}
