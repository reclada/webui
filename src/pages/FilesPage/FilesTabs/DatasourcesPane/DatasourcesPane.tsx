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
import { DisplayingTypes } from 'src/stores/Types';

import { DatasourcesTable2 } from './DatasorcesTable2/DatasourcesTable2';
import { DatasourcesCardRow } from './DatasourcesCardsRow/DatasuorcesCardRow';
import style from './DatasourcesPane.module.scss';
import { DatasourcesTable } from './DatasourcesTable/DatasourcesTable';
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
        // <DatasourcesTable3 />
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
