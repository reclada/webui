import React, { FC, useCallback } from 'react';

import { ReactComponent as ArrowDownIcon } from '../../../resources/arrow-down.svg';
import { classNames } from '../../../utils/classNames';
import { Button } from '../../Button/Button';
import { SearchTagType } from '../SearchFieldService';

import style from './SearchTag.module.scss';

type SearchTagProps = {
  className?: string;
  tagId: string;
  tag: string;
  tagType: SearchTagType;
  focusRef?: React.Ref<HTMLElement>;
  onRemove: (id: string) => void;
};

export const SearchTag: FC<SearchTagProps> = function SearchTag({
  className,
  tag,
  tagId,
  tagType,
  onRemove,
  focusRef,
}) {
  const remove = useCallback(() => onRemove(tagId), [onRemove, tagId]);

  return (
    <div
      className={classNames(className, style.root, {
        [style.tagToken]: tagType === SearchTagType.Token,
        [style.tagOperator]: tagType === SearchTagType.Operator,
        [style.tagString]: tagType === SearchTagType.String,
      })}
    >
      <div className={style.text}>{tag}</div>
      <Button breed="icon" className={style.remove} onClick={remove}>
        <ArrowDownIcon />
      </Button>
    </div>
  );
};
