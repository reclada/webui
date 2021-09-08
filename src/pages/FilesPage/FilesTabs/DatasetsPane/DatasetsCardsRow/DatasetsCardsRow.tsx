import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';

import { datasetsDataService } from '../datasetsData.service';

import { DatasetsCard } from './DatasetsCard';
import style from './DatasetsCards.module.scss';

type DatasetsCardsRowProp = {
  index: number;
  isScrolling?: boolean;
};

export const DatasetsCardsRow: FC<DatasetsCardsRowProp> = observer(
  function DatasetsCardsRow({ index, isScrolling }) {
    return (
      <div className={style.tableCard}>
        <>
          {index * 3 >= datasetsDataService.count ? null : (
            <DatasetsCard index={index * 3} isScroling={isScrolling} />
          )}
          {index * 3 + 1 >= datasetsDataService.count ? null : (
            <DatasetsCard index={index * 3 + 1} isScroling={isScrolling} />
          )}
          {index * 3 + 2 >= datasetsDataService.count ? null : (
            <DatasetsCard index={index * 3 + 2} isScroling={isScrolling} />
          )}
        </>
      </div>
    );
  }
);
