import React, { FC, memo } from 'react';

import { ArticleType } from 'src/api/articleService';
import { Tag } from 'src/shared/Tag/Tag';
import { CellRendererProps } from 'src/types/CellRenderer';

import style from './ArticleTypeRenderer.module.scss';

export const ArticleTypeRenderer: FC<CellRendererProps<ArticleType>> = memo(
  ({ value, onClick }) => {
    const handleClick = () => onClick?.(value);

    return (
      <Tag className={style.type} onClick={handleClick}>
        {value}
      </Tag>
    );
  }
);
