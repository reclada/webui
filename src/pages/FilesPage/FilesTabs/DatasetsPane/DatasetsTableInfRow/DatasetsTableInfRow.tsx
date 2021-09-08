import { Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';

import { OwnersRenderer } from '../../shared/OwnersRenderer/OwnersRenderer';
import { DatasetNameRenderer } from '../DatasetNameRenderer/DatasetNameRenderer';
import { datasetsDataService } from '../datasetsData.service';
import { MoreMenuRenderer } from '../DatasetsTable/MoreMenuRenderer/MoreMenuRenderer';

import style from './DatasetsTableInfRow.module.scss';

type DatasetsTableInfRowProp = {
  index: number;
  isScrolling?: boolean;
};

export const DatasetsTableInfRow: FC<DatasetsTableInfRowProp> = observer(
  function DatasetsTableInfRow({ index, isScrolling }) {
    const dataset = datasetsDataService.getRow(index);

    if (!dataset && !isScrolling) {
      datasetsDataService.updateList(index);
    }

    const onSelect = () => {
      datasetsDataService.setActiveRecord(dataset);
    };

    const onUpdate = (name: string) => {
      if (dataset) {
        dataset.title = name;
        datasetsDataService.updateRow(index, dataset);
      }
    };

    return (
      <>
        {!dataset ? (
          <Row className={style.rowTable}></Row>
        ) : (
          <Row className={style.rowTable}>
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
      </>
    );
  }
);
