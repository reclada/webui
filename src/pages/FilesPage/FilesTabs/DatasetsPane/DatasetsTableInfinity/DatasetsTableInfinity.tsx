import { Row, Col, Divider } from 'antd';
import React, { FC } from 'react';

import { IDataset } from 'src/api/datasetsDataGateService';
import { InfiniteList } from 'src/shared/InfiniteList/InfiniteList';

import { OwnersRenderer } from '../../shared/OwnersRenderer/OwnersRenderer';
import { DatasetNameRenderer } from '../DatasetNameRenderer/DatasetNameRenderer';
import { datasetsDataService } from '../datasetsData.service';
import { MoreMenuRenderer } from '../DatasetsTable/MoreMenuRenderer/MoreMenuRenderer';

import style from './DatasetsTableInfinity.module.scss';
import { DatasetsTableInfRow } from './DatasetsTableInfRow/DatasetsTableInfRow';

type DatasetsTableInfinityProps = {
  service: {
    datasets: () => IDataset[];
    getOffsetValue: () => number;
    setOffset: (value: number) => Promise<void>;
    getElemNumber: () => number;
  };
  onSelect: (record: IDataset) => void;
  onUpdate: (name: string, id: string) => void;
  onClickHeader: (key: string) => void;
};

export const DatasetsTableInfinity: FC<DatasetsTableInfinityProps> = function DatasetsTableInfinity({
  service,
  onUpdate,
  onSelect,
  onClickHeader,
}) {
  var tId = 0;

  const serviceCards = {
    //getRow: () => datasetsDataService.getRowByIndex,
    prepareData: (
      startIndex: number,
      stopIndex: number,
      setLoading: (value: boolean) => void
    ) => {
      if (
        stopIndex < datasetsDataService.offsetValue + 800 &&
        startIndex >= datasetsDataService.offsetValue
      ) {
        return;
      }
      new Promise((resolve, reject) => {
        setLoading(true);

        if (tId > 0) {
          clearTimeout(tId);
        }

        tId = window.setTimeout(async () => {
          await datasetsDataService.setOffset(
            startIndex - 300 >= 0 ? startIndex - 300 : 0
          );
          resolve(true);
        }, 1000);
      }).then(value => {
        if (value) setLoading(false);
      });
    },
    rowCount: datasetsDataService.elemNumber,
  };

  return (
    <div className={style.table}>
      <div className={style.headTable}>
        <Row>
          <Col
            className={style.columnTable}
            span={3}
            onClick={() => onClickHeader('attrs, name')}
          >
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
      {/* <InfiniteList className={''} itemSize={55} serviceData={serviceCards}>
        <DatasetsTableInfRow
          index={0}
          isLoading={false}
          service={datasetsDataService}
          onSelect={onSelect}
          onUpdate={onUpdate}
        />
      </InfiniteList> */}
    </div>
  );
};
