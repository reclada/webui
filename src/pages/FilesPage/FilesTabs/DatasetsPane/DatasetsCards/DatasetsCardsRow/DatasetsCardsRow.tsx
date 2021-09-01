import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';

import { datasetsDataService } from '../../datasetsData.service';
import style from '../DatasetsCards.module.scss';

import { DatasetsCard } from './DatasetsCard';

type DatasetsCardsRowProp = {
  index: number;
  isScrolling?: boolean;
  onSelect: (record: IDataset) => void;
  onUpdate: (name: string, dataSet: IDataset, index: number) => void;
};

export const DatasetsCardsRow: FC<DatasetsCardsRowProp> = observer(
  function DatasetsCardsRow({ index, isScrolling, onSelect, onUpdate }) {
    // if (isScrolling) {
    //   return (
    //     <div className={style.tableCard}>
    //       <DatasetsCard
    //         dataset={undefined}
    //         index={index * 3}
    //         loading={true}
    //         onSelect={onSelect}
    //         onUpdate={onUpdate}
    //       />
    //       <DatasetsCard
    //         dataset={undefined}
    //         index={index * 3 + 1}
    //         loading={true}
    //         onSelect={onSelect}
    //         onUpdate={onUpdate}
    //       />
    //       <DatasetsCard
    //         dataset={undefined}
    //         index={index * 3 + 2}
    //         loading={true}
    //         onSelect={onSelect}
    //         onUpdate={onUpdate}
    //       />
    //     </div>
    //   );
    // }

    const dataset1 = datasetsDataService.listStore.getRow(index * 3) as IDataset;
    const dataset2 = datasetsDataService.listStore.getRow(index * 3 + 1) as IDataset;
    const dataset3 = datasetsDataService.listStore.getRow(index * 3 + 2) as IDataset;

    if (!isScrolling && (dataset1 || dataset2 || dataset3)) {
      datasetsDataService.listStore.updateList(index * 3);
      datasetsDataService.listStore.updateList(index * 3 + 1);
      datasetsDataService.listStore.updateList(index * 3 + 2);
    }

    return (
      <div className={style.tableCard}>
        <>
          {index * 3 >= datasetsDataService.listStore.count ? null : (
            <DatasetsCard
              dataset={dataset1}
              index={index * 3}
              loading={!dataset1}
              onSelect={onSelect}
              onUpdate={onUpdate}
            />
          )}
          {index * 3 + 1 >= datasetsDataService.listStore.count ? null : (
            <DatasetsCard
              dataset={dataset2}
              index={index * 3 + 1}
              loading={!dataset2}
              onSelect={onSelect}
              onUpdate={onUpdate}
            />
          )}
          {index * 3 + 2 >= datasetsDataService.listStore.count ? null : (
            <DatasetsCard
              dataset={dataset3}
              index={index * 3 + 2}
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
