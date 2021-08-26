import React, { FC } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';
import { InfiniteList } from 'src/shared/InfiniteList/InfiniteList';

import { DatasetsCard } from './DatasetsCard';
import style from './DatasetsCards.module.scss';

type DatasetsCardsProps = {
  service: {
    datasets: () => IDataset[];
    getOffsetValue: () => number;
    setOffset: (value: number) => void;
    getElemNumber: () => number;
  };
  onSelect: (record: IDataset) => void;
  onUpdate: (name: string, id: string) => void;
};

export const DatasetsCards: FC<DatasetsCardsProps> = function DatasourcesCards({
  service,
  onSelect,
  onUpdate,
}) {
  var tId = 0;

  const serviceCards = {
    getRow: (rowIndex: number, setLoading: (value: boolean) => void) => {
      new Promise((resolve, reject) => {
        if (
          rowIndex * 3 >= service.getOffsetValue() + 30 ||
          rowIndex * 3 < service.getOffsetValue()
        ) {
          setLoading(true);

          if (tId > 0) {
            clearTimeout(tId);
          }

          tId = window.setTimeout(async () => {
            await service.setOffset(rowIndex * 3 - 27 >= 0 ? rowIndex * 3 - 27 : 0);
            resolve(true);
          }, 1000);
        } else {
          resolve(false);
        }
      }).then(value => {
        if (value) setLoading(false);
      });

      return (
        <>
          <div className={style.tableCard}>
            <>
              {rowIndex * 3 - service.getOffsetValue() < service.datasets().length &&
              service.datasets()[rowIndex * 3 - service.getOffsetValue()] ? (
                <DatasetsCard
                  dataset={service.datasets()[rowIndex * 3 - service.getOffsetValue()]}
                  loading={false}
                  onSelect={onSelect}
                  onUpdate={onUpdate}
                />
              ) : rowIndex * 3 + 1 > service.getElemNumber() ? null : (
                <DatasetsCard
                  loading={true}
                  onSelect={onSelect}
                  onUpdate={onUpdate}
                ></DatasetsCard>
              )}
              {rowIndex * 3 + 1 - service.getOffsetValue() < service.datasets().length &&
              service.datasets()[rowIndex * 3 + 1 - service.getOffsetValue()] ? (
                <DatasetsCard
                  dataset={
                    service.datasets()[rowIndex * 3 + 1 - service.getOffsetValue()]
                  }
                  loading={false}
                  onSelect={onSelect}
                  onUpdate={onUpdate}
                />
              ) : rowIndex * 3 + 2 > service.getElemNumber() ? null : (
                <DatasetsCard
                  loading={true}
                  onSelect={onSelect}
                  onUpdate={onUpdate}
                ></DatasetsCard>
              )}
              {rowIndex * 3 + 2 - service.getOffsetValue() < service.datasets().length &&
              service.datasets()[rowIndex * 3 + 2 - service.getOffsetValue()] ? (
                <DatasetsCard
                  dataset={
                    service.datasets()[rowIndex * 3 + 2 - service.getOffsetValue()]
                  }
                  loading={false}
                  onSelect={onSelect}
                  onUpdate={onUpdate}
                />
              ) : rowIndex * 3 + 3 > service.getElemNumber() ? null : (
                <DatasetsCard
                  loading={true}
                  onSelect={onSelect}
                  onUpdate={onUpdate}
                ></DatasetsCard>
              )}
            </>
          </div>
        </>
      );
    },
    rowCount:
      service.getElemNumber() % 3 > 0
        ? Math.floor(service.getElemNumber() / 3) + 1
        : service.getElemNumber() / 3,
  };

  return (
    <div className={style.tableCard}>
      {/* {datasets?.map((el, index) => (
        <DatasetsCard
          loading={false}
          onSelect={onSelect}
          onUpdate={onUpdate}
          dataset={el}
        ></DatasetsCard>
      ))} */}
      <InfiniteList className={''} itemSize={270} serviceData={serviceCards} />
    </div>
  );
};
