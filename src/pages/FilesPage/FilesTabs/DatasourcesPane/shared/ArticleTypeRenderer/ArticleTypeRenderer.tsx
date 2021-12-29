import React, { FC, memo } from 'react';

import { ArticleType } from 'src/api/articleService';
import { CellRendererProps } from 'src/types/CellRenderer';

import style from './ArticleTypeRenderer.module.scss';

export const ArticleTypeRenderer: FC<CellRendererProps<ArticleType>> = memo(
  ({ value, onClick }) => {
    const handleClick = () => onClick?.(value);

    return (
      <div className={style.type} onClick={handleClick}>
        {value}
      </div>
    );
  }
);
