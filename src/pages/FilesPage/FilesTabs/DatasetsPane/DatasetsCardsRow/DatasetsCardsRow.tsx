import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { ListChildComponentProps } from 'react-window';

import { datasetsDataService } from '../datasetsData.service';

import { DatasetsCard } from './DatasetsCard';
import styleModule from './DatasetsCards.module.scss';

export const DatasetsCardsRow: FC<ListChildComponentProps> = function DatasetsCardsRow({
  index,
  isScrolling,
  style,
}) {
  return (
    <div key={index} style={style}>
      <div className={styleModule.tableCard}>
        {index * 3 >= datasetsDataService.count ? null : (
          <DatasetsCard index={index * 3} isScroling={isScrolling} />
        )}
        {index * 3 + 1 >= datasetsDataService.count ? null : (
          <DatasetsCard index={index * 3 + 1} isScroling={isScrolling} />
        )}
        {index * 3 + 2 >= datasetsDataService.count ? null : (
          <DatasetsCard index={index * 3 + 2} isScroling={isScrolling} />
        )}
      </div>
    </div>
  );
};
