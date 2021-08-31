import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';

import { datasetsDataService } from '../../datasetsData.service';
import style from '../DatasetsCards.module.scss';

import { DatasetsCard } from './DatasetsCard';

type DatasetsCardsRowProp = {
  index: number;
  onSelect: (record: IDataset) => void;
  onUpdate: (name: string, id: string) => void;
};

export const DatasetsCardsRow: FC<DatasetsCardsRowProp> = observer(
  function DatasetsCardsRow({ index, onSelect, onUpdate }) {
    const dataset1 = datasetsDataService.getRowByIndex(index * 3);
    const dataset2 = datasetsDataService.getRowByIndex(index * 3);
    const dataset3 = datasetsDataService.getRowByIndex(index * 3);

    return (
      <div className={style.tableCard}>
        <>
          {index * 3 >= datasetsDataService.elemNumber ? null : (
            <DatasetsCard
              dataset={dataset1}
              loading={!dataset1}
              onSelect={onSelect}
              onUpdate={onUpdate}
            />
          )}
          {index * 3 + 1 >= datasetsDataService.elemNumber ? null : (
            <DatasetsCard
              dataset={dataset2}
              loading={!dataset2}
              onSelect={onSelect}
              onUpdate={onUpdate}
            />
          )}
          {index * 3 + 2 >= datasetsDataService.elemNumber ? null : (
            <DatasetsCard
              dataset={dataset3}
              loading={!dataset3}
              onSelect={onSelect}
              onUpdate={onUpdate}
            />
          )}
        </>
      </div>
    );
  }
);
