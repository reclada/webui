import React, { FC } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';

import style from '../DatasetsCards.module.scss';

import { DatasetsCard } from './DatasetsCard';

type DatasetsCardsRowProp = {
  index: number;
  isLoading: boolean;
  onSelect: (record: IDataset) => void;
  onUpdate: (name: string, id: string) => void;
  elemNumber: number;
  getRowByIndex: (index: number) => IDataset | undefined;
};

export const DatasetsCardsRow: FC<DatasetsCardsRowProp> = function DatasetsCardsRow({
  index,
  isLoading,
  onSelect,
  onUpdate,
  elemNumber,
  getRowByIndex,
}) {
  const dataset1 = getRowByIndex(index * 3);
  const dataset2 = getRowByIndex(index * 3 + 1);
  const dataset3 = getRowByIndex(index * 3 + 2);

  return (
    <div className={style.tableCard}>
      <>
        {index * 3 >= elemNumber ? null : (
          <DatasetsCard
            dataset={dataset1}
            loading={isLoading && !dataset1}
            onSelect={onSelect}
            onUpdate={onUpdate}
          />
        )}
        {index * 3 + 1 >= elemNumber ? null : (
          <DatasetsCard
            dataset={dataset2}
            loading={isLoading && !dataset2}
            onSelect={onSelect}
            onUpdate={onUpdate}
          />
        )}
        {index * 3 + 2 >= elemNumber ? null : (
          <DatasetsCard
            dataset={dataset3}
            loading={isLoading && !dataset3}
            onSelect={onSelect}
            onUpdate={onUpdate}
          />
        )}
      </>
    </div>
  );
};
