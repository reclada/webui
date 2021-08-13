import { Card, Checkbox } from 'antd';
import React, { FC, useCallback } from 'react';

import { IDatasource } from '../../../../../api/datasourcesService';
import { ArticleNameRenderer } from '../ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from '../ArticleTypeRenderer/ArticleTypeRenderer';
import { datasourceTableService } from '../datasourceTable.service';
import { MoreMenuRenderer } from '../MoreMenuRenderer/MoreMenuRenderer';

import style from './DatasourcesCards.module.scss';

type DatasourcesCardsProps = {
  datasources: IDatasource[] | undefined;
  setDataSources: any;
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
          title={
            <div className={style.titleCard}>
              <Checkbox
                style={{ marginRight: '5px' }}
                onChange={event => {
                  onCheckbox(el, event.target.checked);
                }}
                checked={
                  datasourceTableService.selectedRows.filter(chel => el.id === chel)
                    .length > 0
                }
              />
              <ArticleTypeRenderer articleType={el.type} />
            </div>
          }
          className={style.card}
          extra={
            <MoreMenuRenderer
              datasource={el}
              onUpdate={(name, datasetId) => {
                const newDataset = datasources?.find(foo => foo.id === datasetId);

                if (newDataset !== undefined) newDataset.name = name;

                if (datasources !== undefined) {
                  setDataSources([...datasources]);
                }
              }}
            />
          }
        >
          <ArticleNameRenderer title={el.name} />
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
        </Card>
      ))}
    </div>
  );
};
