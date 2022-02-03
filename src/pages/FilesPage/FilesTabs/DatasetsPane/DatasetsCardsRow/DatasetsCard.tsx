import { Card } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';

import { IRecladaDataset } from 'src/api/IRecladaObject';

import { OwnersRenderer } from '../../../../shared/OwnersRenderer/OwnersRenderer';
import { datasetsDataService } from '../datasetsData.service';
import { DatasetNameRenderer } from '../shared/DatasetNameRenderer/DatasetNameRenderer';
import { MoreMenuRenderer } from '../shared/MoreMenuRenderer/MoreMenuRenderer';

import style from './DatasetsCards.module.scss';

type DatasetCardProps = {
  isScroling?: boolean;
  className?: string;
  index: number;
};

export const DatasetsCard: FC<DatasetCardProps> = observer(function DatasetsCard({
  className,
  isScroling,
  index,
}) {
  const dataset = datasetsDataService.getRow(index);

  if (!isScroling) {
    datasetsDataService.updateList(index);
  }

  const onSelect = useCallback(() => {
    datasetsDataService.setActiveRecord(dataset);
  }, [dataset]);

  const onUpdate = useCallback(
    (name: string) => {
      if (dataset) {
        dataset['{attributes,name}'] = name;
        datasetsDataService.updateRow(index, dataset as any);
      }
    },
    [dataset, index]
  );

  return (
    <>
      {!dataset ? (
        <Card className={style.card} loading={true}></Card>
      ) : (
        <Card
          key={dataset['{GUID}']}
          className={style.card}
          extra={
            <MoreMenuRenderer
              dataSet={(dataset as unknown) as IRecladaDataset}
              // datasetIndex={index}
              //dataSetId={dataset.id}
              //prevName={dataset.title}
              onUpdate={onUpdate}
            />
          }
          title={
            <div className={style.titleCard}>
              <DatasetNameRenderer dataset={dataset as any} onSelect={onSelect} />
            </div>
          }
        >
          {/* <ArticleNameRenderer title={dataset.name} className={style.nameCard} /> */}
          <div className={style.cardContent}>
            <div className={style.captionCard}>Create date</div>
            <div>
              {new Date(dataset['{createdTime}']).getDate() +
                '-' +
                new Date(dataset['{createdTime}']).getMonth() +
                '-' +
                new Date(dataset['{createdTime}']).getFullYear()}
            </div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Author</div>
            <div>{(dataset as any).author}</div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Last update</div>
            <div>
              {(dataset as any).lastUpdate.getDate() +
                '-' +
                (dataset as any).lastUpdate.getMonth() +
                '-' +
                (dataset as any).lastUpdate.getFullYear()}
            </div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Who updated</div>
            <div>{(dataset as any).whoUpdated}</div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Owner</div>
            <OwnersRenderer owners={(dataset as any).owners} />
          </div>
        </Card>
      )}
    </>
  );
});
