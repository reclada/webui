import { Row, Col, Divider } from 'antd';
import React, { FC } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';

import { OwnersRenderer } from '../../../shared/OwnersRenderer/OwnersRenderer';
import { DatasetNameRenderer } from '../../DatasetNameRenderer/DatasetNameRenderer';
import { MoreMenuRenderer } from '../../DatasetsTable/MoreMenuRenderer/MoreMenuRenderer';
import style from '../DatasetsTableInfinity.module.scss';

type DatasetsTableInfRowProp = {
  index: number;
  isLoading: boolean;
  onSelect: (record: IDataset) => void;
  onUpdate: (name: string, id: string) => void;
  elemNumber: number;
  getRowByIndex: (index: number) => IDataset | undefined;
};

export const DatasetsTableInfRow: FC<DatasetsTableInfRowProp> = function DatasetsTableInfRow({
  index,
  isLoading,
  onSelect,
  onUpdate,
  elemNumber,
  getRowByIndex,
}) {
  const dataset = getRowByIndex(index);

  //console.log(index, isLoading, dataset, offsetValue);

  return (
    <>
      {!dataset || (!dataset && isLoading) ? (
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
              dataSetId={dataset.id}
              prevName={dataset.title}
              onUpdate={onUpdate}
            />
          </Col>
        </Row>
      )}
    </>
  );
};
