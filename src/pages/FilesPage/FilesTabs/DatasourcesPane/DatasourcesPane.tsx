import { Col, Divider, Result, Row, Checkbox } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';

import { ArticleViewPanel } from 'src/pages/SearchResultPage/SearchResultMain/ArticleViewPanel/ArticleViewPanel';
import style from 'src/pages/SearchResultPage/SearchResultMain/SearchResultMain.module.scss';
import {
  ResultToolbar,
  ToolbarContext,
} from 'src/pages/shared/ResultToolbar/ResultToolbar';
import { InfiniteList } from 'src/shared/InfiniteList/InfiniteList';
import { DisplayingTypes, OrderType } from 'src/shared/Sorting/Sorting';
import { useOpen } from 'src/utils/useOpen';

import { DatasourcesCardRow } from './DatasourcesCardsRow/DatasuorcesCardRow';
import { useFileUrl } from './DatasourcesTable/FilePreviewModal/useFileUrl';
import { DatasourcesTableRow } from './DatasourcesTableRow/DatasourceTableRow';
import { datasourceTableService } from './datasourceTable.service';

type DatasourcesPaneProps = {
  datasetId?: string;
};

export const DatasourcesPane: FC<DatasourcesPaneProps> = observer(
  function DatasourcesPane({ datasetId }) {
    useEffect(() => {
      datasourceTableService.setDataSet(datasetId);
    }, [datasetId]);

    const addDatasourceToDatasetModal = useOpen();

    const activeUrl = useFileUrl(
      datasourceTableService.activeRecord ? datasourceTableService.activeRecord.id : '',
      datasourceTableService.activeRecord !== undefined
    );

    const onClickHeader = (key: string) => {
      //   const dk = datasourceTableService.orders?.filter(el => el.field === key);
      //   if (dk && dk.length) {
      //     datasourceTableService.setOrder([
      //       {
      //         field: key,
      //         order: dk[0].order === OrderType.ASC ? OrderType.DESC : OrderType.ASC,
      //       },
      //     ]);
      //   } else {
      //     datasourceTableService.setOrder([
      //       {
      //         field: key,
      //         order: OrderType.DESC,
      //       },
      //     ]);
      //   }
    };

    if (datasourceTableService.isError) {
      return (
        <Result
          status="error"
          subTitle={'Please, try again'}
          title={'Failed to load datasources'}
        />
      );
    }

    if (datasourceTableService.isError) {
      return (
        <Result
          status="error"
          subTitle={'Please, try again'}
          title={'Failed to load datasets'}
        />
      );
    }

    const content =
      datasourceTableService.displaingType === DisplayingTypes.TABLE ? (
        <>
          <div className={style.headTable}>
            <Row>
              <Col span={1}>
                <Checkbox
                  checked={datasourceTableService.selectedRows.length > 0}
                  className={style.checkboxCard}
                  disabled={true}
                />
                <Divider className={style.dividerHeader} type="vertical" />
              </Col>
              <Col span={1}>
                Type <Divider className={style.dividerHeader} type="vertical" />
              </Col>
              <Col
                className={style.columnTable}
                span={4}
                onClick={() => onClickHeader('attrs, name')}
              >
                Name <Divider className={style.dividerHeader} type="vertical" />
              </Col>
              <Col span={3}>
                Create date <Divider className={style.dividerHeader} type="vertical" />
              </Col>
              <Col span={4}>
                Author <Divider className={style.dividerHeader} type="vertical" />
              </Col>
              <Col span={3}>
                Last update <Divider className={style.dividerHeader} type="vertical" />
              </Col>
              <Col span={4}>
                Who updated <Divider className={style.dividerHeader} type="vertical" />
              </Col>
              <Col span={3}>
                Owners <Divider className={style.dividerHeader} type="vertical" />
              </Col>
              <Col span={1}></Col>
            </Row>
          </div>
          <InfiniteList
            className={''}
            itemSize={55}
            rowCount={datasourceTableService.count}
          >
            <DatasourcesTableRow index={0} />
          </InfiniteList>
        </>
      ) : (
        <InfiniteList
          className={''}
          itemSize={270}
          rowCount={
            datasourceTableService.count % 3 > 0
              ? Math.floor(datasourceTableService.count / 3) + 1
              : datasourceTableService.count / 3
          }
        >
          <DatasourcesCardRow index={0} />
        </InfiniteList>
      );

    return (
      <>
        <>
          <div className={style.toolbar}>
            <ToolbarContext.Provider value={datasourceTableService}>
              <ResultToolbar />
            </ToolbarContext.Provider>
          </div>
          <div className={style.main}>
            <div className={style.leftPanelWide}>
              {datasourceTableService.isLoading ? null : content}
            </div>
            {datasourceTableService.activeRecord && (
              <div className={style.rightPanel}>
                <ArticleViewPanel
                  article={{
                    id: datasourceTableService.activeRecord.id,
                    url: activeUrl,
                    title: datasourceTableService.activeRecord.name,
                  }}
                />
              </div>
            )}
          </div>
        </>
        )
      </>
    );
  }
);
