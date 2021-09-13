import { Row, Col, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';
import { ListChildComponentProps } from 'react-window';

import { ArticleType } from 'src/api/articleService';

import { OwnersRenderer } from '../../shared/OwnersRenderer/OwnersRenderer';
import { ArticleNameRenderer } from '../DatasourcesTable/ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from '../DatasourcesTable/ArticleTypeRenderer/ArticleTypeRenderer';
import { MoreMenuRenderer } from '../DatasourcesTable/MoreMenuRenderer/MoreMenuRenderer';
import { datasourceTableService } from '../datasourceTable.service';

import styleModule from './DatasorcesTableRow.module.scss';

export const DatasourcesTableRow: FC<ListChildComponentProps> = observer(
  function DatasourcesTableRow({ index, isScrolling, style }) {
    const datasource = datasourceTableService.getRow(index);

    if (!datasource && !isScrolling) {
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
      <div key={index} style={style}>
        {!datasource ? (
          <Row className={styleModule.rowTable}></Row>
        ) : (
          <Row className={styleModule.rowTable}>
            <Col span={1}>
              <Checkbox
                checked={
                  datasourceTableService.selectedRows.filter(
                    chel => datasource.id === chel
                  ).length > 0
                }
                className={styleModule.checkboxCard}
                onChange={onSelect}
              />
            </Col>
            <Col span={1}>
              <ArticleTypeRenderer articleType={datasource.type} />
            </Col>
            <Col
              span={4}
              onClick={() => {
                if (datasource.type === ArticleType.PDF) {
                  datasourceTableService.setActiveRecord(datasource);
                }
              }}
            >
              <ArticleNameRenderer
                className={styleModule.nameCard}
                title={datasource.name}
              />
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
      </div>
    );
  }
);
