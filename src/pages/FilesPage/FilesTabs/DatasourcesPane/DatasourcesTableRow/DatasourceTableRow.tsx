import { Row, Col, Checkbox } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';

import { OwnersRenderer } from '../../shared/OwnersRenderer/OwnersRenderer';
import { ArticleNameRenderer } from '../DatasourcesTable/ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from '../DatasourcesTable/ArticleTypeRenderer/ArticleTypeRenderer';
import { MoreMenuRenderer } from '../DatasourcesTable/MoreMenuRenderer/MoreMenuRenderer';
import { datasourceTableService } from '../datasourceTable.service';

import style from './DatasorcesTableRow.module.scss';

type DatasourcesTableRowProp = {
  index: number;
  isScrolling?: boolean;
};

export const DatasourcesTableRow: FC<DatasourcesTableRowProp> = observer(
  function DatasourcesTableRow({ index, isScrolling }) {
    const datasource = datasourceTableService.getRow(index);

    if (!datasource && !isScrolling) {
      datasourceTableService.updateList(index);
    }

    const onUpdate = (name: string) => {
      if (datasource) {
        datasource.name = name;
        datasourceTableService.updateRow(index, datasource);
      }
    };

    const onSelect = useCallback(
      (selected: boolean) => {
        if (datasource) {
          datasourceTableService.selectDataSource(datasource, selected);
        }
      },
      [datasource]
    );

    return (
      <>
        {!datasource ? (
          <Row className={style.rowTable}></Row>
        ) : (
          <Row className={style.rowTable}>
            <Col span={1}>
              <Checkbox
                checked={
                  datasourceTableService.selectedRows.filter(
                    chel => datasource.id === chel
                  ).length > 0
                }
                className={style.checkboxCard}
                onChange={event => {
                  onSelect(event.target.checked);
                }}
              />
            </Col>
            <Col span={1}>
              <ArticleTypeRenderer articleType={datasource.type} />
            </Col>
            <Col
              span={4}
              onClick={() => datasourceTableService.setActiveRecord(datasource)}
            >
              <ArticleNameRenderer className={style.nameCard} title={datasource.name} />
            </Col>
            <Col span={3}>
              {datasource.createDate.getDate() +
                '-' +
                datasource.createDate.getMonth() +
                '-' +
                datasource.createDate.getFullYear()}
            </Col>
            <Col span={4}>{datasource.author}</Col>
            <Col span={3}>
              {datasource.lastUpdate.getDate() +
                '-' +
                datasource.lastUpdate.getMonth() +
                '-' +
                datasource.lastUpdate.getFullYear()}
            </Col>
            <Col span={4}>{datasource.whoUpdated}</Col>
            <Col span={3}>
              <OwnersRenderer owners={datasource.owners} />
            </Col>
            <Col span={1}>
              <MoreMenuRenderer datasource={datasource} onUpdate={onUpdate} />
            </Col>
          </Row>
        )}
      </>
    );
  }
);
