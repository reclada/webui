import { Card } from 'antd';
import React, { FC } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';

import { OwnersRenderer } from '../../shared/OwnersRenderer/OwnersRenderer';
import { DatasetNameRenderer } from '../DatasetsTable/DatasetNameRenderer/DatasetNameRenderer';
import { MoreMenuRenderer } from '../DatasetsTable/MoreMenuRenderer/MoreMenuRenderer';

import style from './DatasetsCards.module.scss';

type DatasetsCardsProps = {
  datasets: IDataset[] | undefined;
  setDataSources?: any;
  onSelect: (record: IDataset) => void;
  onUpdate: (name: string, id: string) => void;
};

export const DatasetsCards: FC<DatasetsCardsProps> = function DatasourcesTable({
  datasets,
  setDataSources,
  onSelect,
  onUpdate,
}) {
  return (
    <div className={style.tableCard}>
      {datasets?.map(el => (
        <Card
          key={el.id}
          title={
            <div className={style.titleCard}>
              {/* <Checkbox
                className={style.checkboxCard}
                onChange={event => {
                  onCheckbox(el, event.target.checked);
                }}
                checked={
                  datasourceTableService.selectedRows.filter(chel => el.id === chel)
                    .length > 0
                }
              /> */}
              <DatasetNameRenderer dataset={el} onSelect={onSelect} />
            </div>
          }
          className={style.card}
          extra={
            <MoreMenuRenderer dataSetId={el.id} prevName={el.title} onUpdate={onUpdate} />
          }
        >
          {/* <ArticleNameRenderer title={el.name} className={style.nameCard} /> */}
          <div className={style.cardContent}>
            <div className={style.captionCard}>Create date</div>
            <div>
              {el.createDate.getDate() +
                '-' +
                el.createDate.getMonth() +
                '-' +
                el.createDate.getFullYear()}
            </div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Author</div>
            <div>{el.author}</div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Last update</div>
            <div>
              {el.lastUpdate.getDate() +
                '-' +
                el.lastUpdate.getMonth() +
                '-' +
                el.lastUpdate.getFullYear()}
            </div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Who updated</div>
            <div>{el.whoUpdated}</div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Owner</div>
            <OwnersRenderer owners={el.owners} />
          </div>
        </Card>
      ))}
    </div>
  );
};
