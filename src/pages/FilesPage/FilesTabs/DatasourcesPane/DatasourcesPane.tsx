import { Col, Divider, Result, Row, Checkbox, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';

import { ArticleViewPanel } from 'src/pages/SearchResultPage/SearchResultMain/ArticleViewPanel/ArticleViewPanel';
import { Pager } from 'src/pages/shared/Pager/Pager';
import {
  ResultToolbar,
  ToolbarContext,
} from 'src/pages/shared/ResultToolbar/ResultToolbar';
import { InfiniteList } from 'src/shared/InfiniteList/InfiniteList';
import { InfiniteGrid } from 'src/shared/InfinitrGrid/InfiniteGrid';
import { DisplayingTypes } from 'src/stores/Types';

import { DatasourcesCardRow } from './DatasourcesCardsRow/DatasuorcesCardRow';
import style from './DatasourcesPane.module.scss';
import { DatasourcesTable } from './DatasourcesTable/DatasourcesTable';
import { DatasourcesTableRow } from './DatasourcesTableRow/DatasourceTableRow';
import { DatasourcesTableRowGrid } from './DatasourcesTableRowGrid/DatasourcesTableRowGrid';
import { datasourceTableService } from './datasourceTable.service';
import { useFileUrl } from './shared/FilePreviewModal/useFileUrl';

type DatasourcesPaneProps = {
  datasetId?: string;
};

export const DatasourcesPane: FC<DatasourcesPaneProps> = observer(
  function DatasourcesPane({ datasetId }) {
    useEffect(() => {
      datasourceTableService.setDataSet(datasetId);
    }, [datasetId]);

    const activeUrl = useFileUrl(
      datasourceTableService.activeRecord ? datasourceTableService.activeRecord.GUID : '',
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
          title={'Failed to load files'}
        />
      );
    }

    const content =
      datasourceTableService.displaingType === DisplayingTypes.TABLE ? (
        <DatasourcesTable />
      ) : (
        // <>
        //   <div className={style.headTable}>
        //     <Row>
        //       <Col span={1}>
        //         <Checkbox
        //           checked={datasourceTableService.selectedRows.length > 0}
        //           className={style.checkboxCard}
        //           disabled={true}
        //         />
        //         <Divider className={style.dividerHeader} type="vertical" />
        //       </Col>
        //       <Col span={1}>
        //         Type <Divider className={style.dividerHeader} type="vertical" />
        //       </Col>
        //       <Col
        //         className={style.columnTable}
        //         span={4}
        //         onClick={() => onClickHeader('attrs, name')}
        //       >
        //         Name <Divider className={style.dividerHeader} type="vertical" />
        //       </Col>
        //       <Col span={3}>
        //         Create date <Divider className={style.dividerHeader} type="vertical" />
        //       </Col>
        //       <Col span={4}>
        //         Author <Divider className={style.dividerHeader} type="vertical" />
        //       </Col>
        //       <Col span={3}>
        //         Last update <Divider className={style.dividerHeader} type="vertical" />
        //       </Col>
        //       <Col span={4}>
        //         Who updated <Divider className={style.dividerHeader} type="vertical" />
        //       </Col>
        //       <Col span={3}>
        //         Owners <Divider className={style.dividerHeader} type="vertical" />
        //       </Col>
        //       <Col span={1}></Col>
        //     </Row>
        //   </div>
        //   {/* <InfiniteList
        //     className={''}
        //     itemSize={55}
        //     rowCount={datasourceTableService.count}
        //   >
        //     {DatasourcesTableRow}
        //   </InfiniteList> */}
        //   <InfiniteGrid
        //     columnCount={9}
        //     columnWidth={(index: number) => 300}
        //     rowCount={datasourceTableService.count}
        //     rowHeight={(index: number) => 30}
        //   >
        //     {DatasourcesTableRowGrid}
        //   </InfiniteGrid>
        // </>
        <InfiniteList
          className={''}
          itemSize={300}
          rowCount={
            datasourceTableService.count % 3 > 0
              ? Math.floor(datasourceTableService.count / 3) + 1
              : datasourceTableService.count / 3
          }
        >
          {DatasourcesCardRow}
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
            <div
              className={
                datasourceTableService.activeRecord
                  ? style.leftPanelSlim
                  : style.leftPanelWide
              }
            >
              {datasourceTableService.isLoading ? (
                <Spin
                  size="large"
                  style={{ position: 'absolute', width: '100%', height: '500px' }}
                />
              ) : (
                content
              )}
            </div>
            <Pager service={datasourceTableService.listStore} />
            {datasourceTableService.activeRecord && (
              <div className={style.rightPanel}>
                <ArticleViewPanel
                  article={{
                    id: datasourceTableService.activeRecord.GUID,
                    url: activeUrl,
                    title: datasourceTableService.activeRecord.name,
                  }}
                />
              </div>
            )}
          </div>
        </>
      </>
    );
  }
);
