import { Card } from 'antd';
import React, { FC } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';

import { OwnersRenderer } from '../../shared/OwnersRenderer/OwnersRenderer';
import { DatasetNameRenderer } from '../DatasetNameRenderer/DatasetNameRenderer';
import { MoreMenuRenderer } from '../DatasetsTable/MoreMenuRenderer/MoreMenuRenderer';

import style from './DatasetsCards.module.scss';

type DatasetCardProps = {
  loading: boolean;
  className?: string;
  dataset?: IDataset;
  onSelect: (record: IDataset) => void;
  onUpdate: (name: string, id: string) => void;
};

export const DatasetsCard: FC<DatasetCardProps> = function DatasetsCard({
  className,
  dataset,
  loading,
  onSelect,
  onUpdate,
}) {
  // function uuidv4() {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c1) {
  //     var rand = (Math.random() * 16) | 0,
  //       val = c1 === 'x' ? rand : (rand & 0x3) | 0x8;

  //     return val.toString(16);
  //   });
  // }

  // if (!dataset) {
  //   dataset = {
  //     id: uuidv4(),
  //     title: 'loading',
  //     createDate: new Date(),
  //     author: 'Author',
  //     owners: [],
  //     lastUpdate: new Date(),
  //     whoUpdated: 'Author',
  //   };
  // }

  return (
    <>
      {!dataset ? (
        <Card className={style.card} loading={true}></Card>
      ) : (
        <Card
          loading={loading}
          key={dataset.id}
          title={
            <div className={style.titleCard}>
              <DatasetNameRenderer dataset={dataset} onSelect={onSelect} />
            </div>
          }
          className={style.card}
          extra={
            <MoreMenuRenderer
              dataSetId={dataset.id}
              prevName={dataset.title}
              onUpdate={onUpdate}
            />
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
};
