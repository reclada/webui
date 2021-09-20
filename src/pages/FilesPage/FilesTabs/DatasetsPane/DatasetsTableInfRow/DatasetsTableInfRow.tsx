import { Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';
import { ListChildComponentProps } from 'react-window';

import { OwnersRenderer } from '../../../../shared/OwnersRenderer/OwnersRenderer';
import { datasetsDataService } from '../datasetsData.service';
import { DatasetNameRenderer } from '../shared/DatasetNameRenderer/DatasetNameRenderer';
import { MoreMenuRenderer } from '../shared/MoreMenuRenderer/MoreMenuRenderer';

import styleModule from './DatasetsTableInfRow.module.scss';

export const DatasetsTableInfRow: FC<ListChildComponentProps> = observer(
  function DatasetsTableInfRow({ index, isScrolling, style }) {
    const dataset = datasetsDataService.getRow(index);

    if (!dataset && !isScrolling) {
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
      <div key={index} style={style}>
        {!dataset ? (
          <Row className={styleModule.rowTable}></Row>
        ) : (
          <Row className={styleModule.rowTable}>
            <Col span={3}>
              <DatasetNameRenderer dataset={dataset} onSelect={onSelect} />
            </Col>
            <Col span={4}>
              {dataset.createDate.getDate() +
                '-' +
                dataset.createDate.getMonth() +
                '-' +
                dataset.createDate.getFullYear()}
            </Col>
            <Col span={4}>{dataset.author}</Col>
            <Col span={4}>
              {dataset.lastUpdate.getDate() +
                '-' +
                dataset.lastUpdate.getMonth() +
                '-' +
                dataset.lastUpdate.getFullYear()}
            </Col>
            <Col span={4}>{dataset.whoUpdated}</Col>
            <Col span={4}>
              <OwnersRenderer owners={dataset.owners} />
            </Col>
            <Col span={1}>
              <MoreMenuRenderer
                dataSet={dataset}
                //dataSetId={dataset.id}
                datasetIndex={index}
                //prevName={dataset.title}
                onUpdate={onUpdate}
              />
            </Col>
          </Row>
        )}
      </div>
    );
  }
);
