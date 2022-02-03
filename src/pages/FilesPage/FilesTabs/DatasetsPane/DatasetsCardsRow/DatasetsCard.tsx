import { Card } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';

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
        dataset.title = name;
        datasetsDataService.updateRow(index, dataset);
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
          key={dataset.GUID}
          className={style.card}
          extra={
            <MoreMenuRenderer
              dataSet={dataset}
              datasetIndex={index}
              //dataSetId={dataset.id}
              //prevName={dataset.title}
              onUpdate={onUpdate}
            />
          }
          title={
            <div className={style.titleCard}>
              <DatasetNameRenderer dataset={dataset} onSelect={onSelect} />
            </div>
          }
        >
          {/* <ArticleNameRenderer title={dataset.name} className={style.nameCard} /> */}
          <div className={style.cardContent}>
            <div className={style.captionCard}>Create date</div>
            <div>
              {dataset.createDate.getDate() +
                '-' +
                dataset.createDate.getMonth() +
                '-' +
                dataset.createDate.getFullYear()}
            </div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Author</div>
            <div>{dataset.author}</div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Last update</div>
            <div>
              {dataset.lastUpdate.getDate() +
                '-' +
                dataset.lastUpdate.getMonth() +
                '-' +
                dataset.lastUpdate.getFullYear()}
            </div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Who updated</div>
            <div>{dataset.whoUpdated}</div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Owner</div>
            <OwnersRenderer owners={dataset.owners} />
          </div>
        </Card>
      )}
    </>
  );
});
