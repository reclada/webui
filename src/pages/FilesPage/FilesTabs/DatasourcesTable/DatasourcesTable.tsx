import { Result, TableColumnType } from 'antd';
import { SelectionSelectFn, TableRowSelection } from 'antd/lib/table/interface';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useState, useMemo, useReducer } from 'react';

import { ArticleType } from 'src/api/articleService';
import { datasourceTableService } from 'src/pages/FilesPage/FilesTabs/DatasourcesTable/datasourceTable.service';
import { useFileUrl } from 'src/pages/FilesPage/FilesTabs/DatasourcesTable/FilePreviewModal/useFileUrl';
import { DisplayingTypes } from 'src/pages/SearchResultPage/SearchResultMain/ResultToolbar/ResultToolbar';
import {
  ResultToolbar,
  ToolbarContext,
} from 'src/pages/SearchResultPage/SearchResultMain/ResultToolbar/ResultToolbar';
import { useOpen } from 'src/utils/useOpen';
//import { isError } from 'util';

import {
  fetchDatasources,
  IDatasource,
  OrderBy,
} from '../../../../api/datasourcesService';
import { Table } from '../../../../shared/Table/Table';
import { ArticleViewPanel } from '../../../SearchResultPage/SearchResultMain/ArticleViewPanel/ArticleViewPanel';
import style from '../../../SearchResultPage/SearchResultMain/SearchResultMain.module.scss';
import { AddDatasourceToDatasetModal } from '../AddDatasourceToDatasetModal/AddDatasourceToDatasetModal';
import { OwnersRenderer } from '../shared/OwnersRenderer/OwnersRenderer';

import { ArticleNameRenderer } from './ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from './ArticleTypeRenderer/ArticleTypeRenderer';
import { DatasourcesCards } from './DatasourcesCards/DatasourcesCards';
import { MoreMenuRenderer } from './MoreMenuRenderer/MoreMenuRenderer';

type DatasourcesTableProps = {
  datasetId?: string;
};

const initialState = {
  displayingType: DisplayingTypes.TABLE,
  activeRecord: null,
  order: new Array<OrderBy>(),
};

export const DatasourcesTable: FC<DatasourcesTableProps> = observer(
  function DatasourcesTable({ datasetId }) {
    const [datasources, setDatasources] = useState<IDatasource[] | undefined>(undefined);

    const addDatasourceToDatasetModal = useOpen();

    const activeUrl = useFileUrl(
      datasourceTableService.ActiveRecord ? datasourceTableService.ActiveRecord.id : ''
    );

    const columns: TableColumnType<IDatasource>[] = [
      {
        dataIndex: 'type',
        title: 'Type',
        render: (type: IDatasource['type']) => <ArticleTypeRenderer articleType={type} />,
      },
      {
        dataIndex: 'name',
        title: 'Name',
        render: (name: IDatasource['name']) => <ArticleNameRenderer title={name} />,
        onCell: (record: IDatasource | null, rowIndex: number | undefined) => ({
          onClick: () => {
            console.log(record);
            record && record.type === ArticleType.PDF
              ? datasourceTableService.setActiveRecord(record)
              : datasourceTableService.setActiveRecord(undefined);
          },
        }),
        // onHeaderCell: column => {
        //   return {
        //     onClick: () => {
        //       setOrderRecords(prevOrder => {
        //         if (!prevOrder.length) {
        //           return [{ field: 'name', order: OrderType.ASC }];
        //         } else {
        //           return [
        //             {
        //               field: 'name',
        //               order:
        //                 prevOrder[0].order === OrderType.ASC
        //                   ? OrderType.DESC
        //                   : OrderType.ASC,
        //             },
        //           ];
        //         }
        //       });
        //     },
        //   };
        // },
      },
      {
        dataIndex: 'createDate',
        title: 'Create date',
        render: (date: Date) =>
          date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
      },
      {
        dataIndex: 'author',
        title: 'Author',
      },
      {
        dataIndex: 'lastUpdate',
        title: 'Last update',
        render: (date: Date) =>
          date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
      },
      {
        dataIndex: 'whoUpdated',
        title: 'Who updated',
      },
      {
        dataIndex: 'owners',
        title: 'Owner',
        render: (owners: IDatasource['owners']) => <OwnersRenderer owners={owners} />,
      },
      {
        render: (_, datasource) => (
          <MoreMenuRenderer
            datasource={datasource}
            onUpdate={(name, datasetId) => {
              const newDataset = datasources?.find(foo => foo.id === datasetId);

              if (newDataset !== undefined) newDataset.name = name;

              if (datasources !== undefined) {
                setDatasources([...datasources]);
              }
            }}
          />
        ),
      },
    ];

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const UpdateDatasources = useCallback(() => {
      setIsLoading(true);
      setDatasources(undefined);
      setIsError(false);

      fetchDatasources(datasetId, [])
        .then(datasources => {
          setDatasources(datasources);
          setIsLoading(false);
        })
        .catch(res => {
          setIsError(true);
          setIsLoading(false);
          setErrorMessage(res.message);
        });
    }, [datasetId]);

    useEffect(() => {
      UpdateDatasources();
    }, [datasetId, UpdateDatasources]);

    const onSelect: SelectionSelectFn<IDatasource> = useCallback(
      (record: IDatasource, selected: boolean) => {
        datasourceTableService.selectDataSource(record, selected);
      },
      []
    );

    const onChange = useCallback((record: IDatasource, selected: boolean) => {
      datasourceTableService.selectDataSource(record, selected);
    }, []);

    const rowSelection: TableRowSelection<any> = {
      selectedRowKeys: datasourceTableService.selectedRows,
      onSelect,
    };

    if (isError) {
      return (
        <Result
          status="error"
          subTitle={'Please, try again'}
          title={'Failed to load datasources'}
        />
      );
    }

    return (
      <>
        <div className={style.toolbar}>
          <ToolbarContext.Provider value={datasourceTableService}>
            <ResultToolbar />
          </ToolbarContext.Provider>
        </div>
        <div className={style.main}>
          {datasourceTableService.DisplaingType === DisplayingTypes.TABLE ? (
            <div
              className={
                datasourceTableService.ActiveRecord
                  ? style.leftPanelSlim
                  : style.leftPanelWide
              }
            >
              <Table
                columns={columns}
                dataSource={datasources}
                loading={isLoading}
                rowKey="id"
                rowSelection={rowSelection}
              />
            </div>
          ) : (
            <DatasourcesCards datasources={datasources} setDataSources={setDatasources} />
          )}
          {datasourceTableService.ActiveRecord && (
            <div className={style.rightPanel}>
              <ArticleViewPanel
                article={{
                  id: datasourceTableService.ActiveRecord.id,
                  url: activeUrl,
                  title: datasourceTableService.ActiveRecord.name,
                }}
              />
            </div>
          )}
        </div>

        <AddDatasourceToDatasetModal
          isOpen={addDatasourceToDatasetModal.isOpen}
          selectedDataSources={datasourceTableService.selectedRows}
          onClose={addDatasourceToDatasetModal.close}
        />
      </>
    );
  }
);
