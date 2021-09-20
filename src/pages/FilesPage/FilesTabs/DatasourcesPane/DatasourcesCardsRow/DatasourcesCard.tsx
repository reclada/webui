import { Card, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';

import { ArticleType } from 'src/api/articleService';

import { OwnersRenderer } from '../../../../shared/OwnersRenderer/OwnersRenderer';
import { datasourceTableService } from '../datasourceTable.service';
import { ArticleNameRenderer } from '../shared/ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from '../shared/ArticleTypeRenderer/ArticleTypeRenderer';
import { MoreMenuRenderer } from '../shared/MoreMenuRenderer/MoreMenuRenderer';

import style from './DatasourcesCardsRow.module.scss';

type DatasetCardProps = {
  isScroling?: boolean;
  className?: string;
  index: number;
};

export const DatasourcesCard: FC<DatasetCardProps> = observer(function DatasourcesCard({
  className,
  isScroling,
  index,
}) {
  const datasource = datasourceTableService.getRow(index);

  if (!isScroling) {
    datasourceTableService.updateList(index);
  }

  const onUpdate = useCallback(
    (name: string) => {
      if (datasource) {
        datasource.name = name;
        datasourceTableService.updateRow(index, datasource);
      }
    },
    [datasource, index]
  );

  const onSelect = useCallback(
    (event: CheckboxChangeEvent) => {
      if (datasource) {
        datasourceTableService.selectDataSource(datasource, event.target.checked);
      }
    },
    [datasource]
  );

  return (
    <>
      {!datasource ? (
        <Card className={style.card} loading={true}></Card>
      ) : (
        <Card
          key={datasource.id}
          className={style.card}
          extra={<MoreMenuRenderer datasource={datasource} onUpdate={onUpdate} />}
          title={
            <div className={style.titleCard}>
              <Checkbox
                checked={
                  datasourceTableService.selectedRows.filter(
                    chel => datasource.id === chel
                  ).length > 0
                }
                className={style.checkboxCard}
                onChange={onSelect}
              />
              <ArticleTypeRenderer articleType={datasource.type} />
            </div>
          }
        >
          <div
            onClick={() => {
              if (datasource.type === ArticleType.PDF) {
                datasourceTableService.setActiveRecord(datasource);
              }
            }}
          >
            <ArticleNameRenderer className={style.nameCard} title={datasource.name} />
          </div>
          <div className={style.cardContent}>
            <div className={style.captionCard}>Create date</div>
            <div>
              {datasource.createDate.getDate() +
                '-' +
                datasource.createDate.getMonth() +
                '-' +
                datasource.createDate.getFullYear()}
            </div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Author</div>
            <div>{datasource.author}</div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Last update</div>
            <div>
              {datasource.lastUpdate.getDate() +
                '-' +
                datasource.lastUpdate.getMonth() +
                '-' +
                datasource.lastUpdate.getFullYear()}
            </div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Who updated</div>
            <div>{datasource.whoUpdated}</div>
          </div>
          <div className={style.divider} />
          <div className={style.cardContent}>
            <div className={style.captionCard}>Owner</div>
            <OwnersRenderer owners={datasource.owners} />
          </div>
        </Card>
      )}
    </>
  );
});
