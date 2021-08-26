import { Card, Checkbox } from 'antd';
import React, { FC, useCallback } from 'react';

import { IDatasource } from '../../../../../api/datasourcesService';
import { OwnersRenderer } from '../../shared/OwnersRenderer/OwnersRenderer';
import { ArticleNameRenderer } from '../ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from '../ArticleTypeRenderer/ArticleTypeRenderer';
import { datasourceTableService } from '../datasourceTable.service';
import { MoreMenuRenderer } from '../MoreMenuRenderer/MoreMenuRenderer';

import style from './DatasourcesCards.module.scss';

type DatasourcesCardsProps = {
  datasources: IDatasource[] | undefined;
  setDataSources?: any;
};

export const DatasourcesCards: FC<DatasourcesCardsProps> = function DatasourcesTable({
  datasources,
  setDataSources,
}) {
  const onCheckbox = useCallback((record: IDatasource, selected: boolean) => {
    datasourceTableService.selectDataSource(record, selected);
  }, []);

  return (
    <div className={style.tableCard}>
      {datasources?.map(el => (
        <Card
          key={el.id}
          className={style.card}
          extra={
            <MoreMenuRenderer
              datasource={el}
              onUpdate={(name, datasetId) => {
                const newDataset = datasources?.find(foo => foo.id === datasetId);

                if (newDataset !== undefined) newDataset.name = name;

                // if (datasources !== undefined) {
                //   setDataSources([...datasources]);
                // }
              }}
            />
          }
          title={
            <div className={style.titleCard}>
              <Checkbox
                checked={
                  datasourceTableService.selectedRows.filter(chel => el.id === chel)
                    .length > 0
                }
                className={style.checkboxCard}
                onChange={event => {
                  onCheckbox(el, event.target.checked);
                }}
              />
              <ArticleTypeRenderer articleType={el.type} />
            </div>
          }
        >
          <ArticleNameRenderer title={el.name} className={style.nameCard} />
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
