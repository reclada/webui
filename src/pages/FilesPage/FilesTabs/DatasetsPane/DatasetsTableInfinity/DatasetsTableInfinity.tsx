import { Row, Col, Divider } from 'antd';
import React, { FC } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';
import { InfiniteList } from 'src/shared/InfiniteList/InfiniteList';

import { OwnersRenderer } from '../../shared/OwnersRenderer/OwnersRenderer';
import { DatasetNameRenderer } from '../DatasetNameRenderer/DatasetNameRenderer';
import { MoreMenuRenderer } from '../DatasetsTable/MoreMenuRenderer/MoreMenuRenderer';

import style from './DatasetsTableInfinity.module.scss';

type DatasetsTableInfinityProps = {
  service: {
    datasets: () => IDataset[];
    getOffsetValue: () => number;
    setOffset: (value: number) => Promise<void>;
    getElemNumber: () => number;
  };
  onSelect: (record: IDataset) => void;
  onUpdate: (name: string, id: string) => void;
};

export const DatasetsTableInfinity: FC<DatasetsTableInfinityProps> = function DatasetsTableInfinity({
  service,
  onUpdate,
  onSelect,
}) {
  var tId = 0;

  const serviceCards = {
    getRow: (rowIndex: number, setLoading: (value: boolean) => void) => {
      new Promise((resolve, reject) => {
        if (
          rowIndex > service.getOffsetValue() + 20 ||
          rowIndex < service.getOffsetValue()
        ) {
          setLoading(true);

          if (tId > 0) {
            clearTimeout(tId);
          }

          tId = window.setTimeout(async () => {
            await service.setOffset(rowIndex - 20 >= 0 ? rowIndex - 20 : 0);
            resolve(true);
          }, 1000);
        } else {
          resolve(false);
        }
      })
        .then(value => {
          if (value) {
            setLoading(false);
          }
        })
        .catch(err => console.log(err));
      // console.log(
      //   service.getOffsetValue(),
      //   rowIndex,
      //   //service.datasets()[rowIndex - service.getOffsetValue()],
      //   service.datasets().length
      // );

      //const dataset = service.datasets()[rowIndex - service.getOffsetValue() - 1];
      return (
        <>
          {rowIndex - service.getOffsetValue() < service.datasets().length &&
          service.datasets()[rowIndex - service.getOffsetValue()] ? (
            <Row className={style.rowTable}>
              <Col span={3}>
                <DatasetNameRenderer
                  dataset={service.datasets()[rowIndex - service.getOffsetValue()]}
                  onSelect={onSelect}
                />
              </Col>
              <Col span={4}>
                {service
                  .datasets()
                  [rowIndex - service.getOffsetValue()].createDate.getDate() +
                  '-' +
                  service
                    .datasets()
                    [rowIndex - service.getOffsetValue()].createDate.getMonth() +
                  '-' +
                  service
                    .datasets()
                    [rowIndex - service.getOffsetValue()].createDate.getFullYear()}
              </Col>
              <Col span={4}>
                {service.datasets()[rowIndex - service.getOffsetValue()].author}
              </Col>
              <Col span={4}>
                {service
                  .datasets()
                  [rowIndex - service.getOffsetValue()].lastUpdate.getDate() +
                  '-' +
                  service
                    .datasets()
                    [rowIndex - service.getOffsetValue()].lastUpdate.getMonth() +
                  '-' +
                  service
                    .datasets()
                    [rowIndex - service.getOffsetValue()].lastUpdate.getFullYear()}
              </Col>
              <Col span={4}>
                {service.datasets()[rowIndex - service.getOffsetValue()].whoUpdated}
              </Col>
              <Col span={4}>
                <OwnersRenderer
                  owners={service.datasets()[rowIndex - service.getOffsetValue()].owners}
                />
              </Col>
              <Col span={1}>
                <MoreMenuRenderer
                  dataSetId={service.datasets()[rowIndex - service.getOffsetValue()].id}
                  prevName={service.datasets()[rowIndex - service.getOffsetValue()].title}
                  onUpdate={onUpdate}
                />
              </Col>
            </Row>
          ) : null}
        </>
      );
      //return <AntTable columns={columns} loading={false} rowKey="id" />;
    },
    rowCount: 26,
  };

  return (
    <div className={style.table}>
      <div className={style.headTable}>
        <Row>
          <Col span={3}>
            Name <Divider className={style.dividerHeader} type="vertical" />
          </Col>
          <Col span={4}>
            Create date <Divider className={style.dividerHeader} type="vertical" />
          </Col>
          <Col span={4}>
            Author <Divider className={style.dividerHeader} type="vertical" />
          </Col>
          <Col span={4}>
            Last update <Divider className={style.dividerHeader} type="vertical" />
          </Col>
          <Col span={4}>
            Who updated <Divider className={style.dividerHeader} type="vertical" />
          </Col>
          <Col span={4}>
            Owners <Divider className={style.dividerHeader} type="vertical" />
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
      <InfiniteList className={''} itemSize={55} serviceData={serviceCards} />
    </div>
  );
};
