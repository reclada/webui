import React, { FC } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';
import { InfiniteList } from 'src/shared/InfiniteList/InfiniteList';

import { datasetsDataService } from '../datasetsData.service';

import style from './DatasetsCards.module.scss';
import { DatasetsCardsRow } from './DatasetsCardsRow/DatasetsCardsRow';

type DatasetsCardsProps = {
  onSelect: (record: IDataset) => void;
  onUpdate: (name: string, id: string) => void;
};

export const DatasetsCards: FC<DatasetsCardsProps> = function DatasourcesCards({
  onSelect,
  onUpdate,
}) {
  var tId = 0;

  const serviceCards = {
    //getRow: () => datasetsDataService.getRowByIndex,
    prepareData: (
      startIndex: number,
      stopIndex: number,
      setLoading: (value: boolean) => void
    ) => {
      if (
        stopIndex * 3 < datasetsDataService.offsetValue + 100 &&
        startIndex * 3 >= datasetsDataService.offsetValue
      ) {
        return;
      }
      new Promise((resolve, reject) => {
        setLoading(true);

        if (tId > 0) {
          clearTimeout(tId);
        }

        tId = window.setTimeout(async () => {
          await datasetsDataService.setOffset(
            startIndex * 3 - 300 >= 0 ? startIndex * 3 - 300 : 0
          );
          resolve(true);
        }, 1000);
      }).then(value => {
        if (value) setLoading(false);
      });
    },
    rowCount:
      datasetsDataService.elemNumber % 3 > 0
        ? Math.floor(datasetsDataService.elemNumber / 3) + 1
        : datasetsDataService.elemNumber / 3,
  };

  return (
    <div className={style.tableCard}>
      {/* <InfiniteList className={''} itemSize={270} serviceData={serviceCards}>
        <DatasetsCardsRow
          index={0}
          isLoading={false}
          service={datasetsDataService}
          onSelect={onSelect}
          onUpdate={onUpdate}
        />
      </InfiniteList> */}
    </div>
  );
};
