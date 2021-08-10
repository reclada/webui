import { Result, TableColumnType } from 'antd';
import { SelectionSelectFn, TableRowSelection } from 'antd/lib/table/interface';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useState, useMemo } from 'react';

import { ArticleType } from 'src/api/articleService';
import { datasourceTableService } from 'src/pages/FilesPage/FilesTabs/DatasourcesTable/datasourceTable.service';
import { useFileUrl } from 'src/pages/FilesPage/FilesTabs/DatasourcesTable/FilePreviewModal/useFileUrl';
//import { isError } from 'util';

import {
  fetchDatasources,
  IDatasource,
  IOrderBy,
  OrderType,
  //OrderType,
} from '../../../../api/datasourcesService';
import { Table } from '../../../../shared/Table/Table';
import { ArticleViewPanel } from '../../../SearchResultPage/SearchResultMain/ArticleViewPanel/ArticleViewPanel';
import style from '../../../SearchResultPage/SearchResultMain/SearchResultMain.module.scss';
import { OwnersRenderer } from '../shared/OwnersRenderer/OwnersRenderer';

import { ArticleNameRenderer } from './ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from './ArticleTypeRenderer/ArticleTypeRenderer';
import { MoreMenuRenderer } from './MoreMenuRenderer/MoreMenuRenderer';

type DatasourcesTableProps = {
  datasetId?: string;
};

export const DatasourcesTable: FC<DatasourcesTableProps> = observer(
  function DatasourcesTable({ datasetId }) {
    const [datasources, setDatasources] = useState<IDatasource[] | undefined>(undefined);
    const [activeRecord, setActiveRecord] = useState<IDatasource | null>(null);
    const [orderRecords, setOrderRecords] = useState<IOrderBy[]>([]);

    const activeUrl = useFileUrl(activeRecord ? activeRecord.id : '');

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
              ? setActiveRecord(record)
              : setActiveRecord(null);
          },
        }),
        onHeaderCell: column => {
          return {
            onClick: () => {
              setOrderRecords(prevOrder => {
                if (!prevOrder.length) {
                  return [{ field: 'name', order: OrderType.ASC }];
                } else {
                  return [
                    {
                      field: 'name',
                      order:
                        prevOrder[0].order === OrderType.ASC
                          ? OrderType.DESC
                          : OrderType.ASC,
                    },
                  ];
                }
              });
            },
          };
        },
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

      fetchDatasources(datasetId, orderRecords)
        .then(datasources => {
          setDatasources(datasources);
          setIsLoading(false);
        })
        .catch(res => {
          setIsError(true);
          setIsLoading(false);
          setErrorMessage(res.message);
        });
    }, [datasetId, orderRecords]);

    useEffect(() => {
      UpdateDatasources();
    }, [datasetId, UpdateDatasources]);

    const onSelect: SelectionSelectFn<IDatasource> = useCallback(
      (record: IDatasource, selected: boolean) => {
        datasourceTableService.selectDataSource(record, selected);
      },
      []
    );

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
      <div className={style.main}>
        <div className={activeRecord ? style.leftPanelSlim : style.leftPanelWide}>
          <Table
            columns={columns}
            dataSource={datasources}
            loading={isLoading}
            rowKey="id"
            rowSelection={rowSelection}
          />
        </div>
        {activeRecord && (
          <div className={style.rightPanel}>
            <ArticleViewPanel
              article={{
                id: activeRecord.id,
                url: activeUrl,
                title: activeRecord.name,
              }}
            />
          </div>
        )}
      </div>
    );
  }
);
