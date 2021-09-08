import { Result, TableColumnType } from 'antd';
// import { SelectionSelectFn, TableRowSelection } from 'antd/lib/table/interface';
// import { observer } from 'mobx-react-lite';
// import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

// import { ArticleType } from 'src/api/articleService';
// import { datasourceTableService } from 'src/pages/FilesPage/FilesTabs/DatasourcesTable/datasourceTable.service';
// import { useFileUrl } from 'src/pages/FilesPage/FilesTabs/DatasourcesTable/FilePreviewModal/useFileUrl';
// import {
//   ResultToolbar,
//   ToolbarContext,
// } from 'src/pages/shared/ResultToolbar/ResultToolbar';
// import { ReactComponent as MenuArrowIcon } from 'src/resources/menu-arrow.svg';
// import { DisplayingTypes, OrderType } from 'src/Sorting';
// import { useOpen } from 'src/utils/useOpen';

// import { fetchDatasources, IDatasource } from '../../../../api/datasourcesService';
// import { Table } from '../../../../shared/Table/Table';
// import { ArticleViewPanel } from '../../../SearchResultPage/SearchResultMain/ArticleViewPanel/ArticleViewPanel';
// import style from '../../../SearchResultPage/SearchResultMain/SearchResultMain.module.scss';
// import { AddDatasourceToDatasetModal } from '../AddDatasourceToDatasetModal/AddDatasourceToDatasetModal';
// import { OwnersRenderer } from '../shared/OwnersRenderer/OwnersRenderer';

// import { ArticleNameRenderer } from './ArticleNameRenderer/ArticleNameRenderer';
// import { ArticleTypeRenderer } from './ArticleTypeRenderer/ArticleTypeRenderer';
// import { DatasourcesCards } from './DatasourcesCards/DatasourcesCards';
// import { MoreMenuRenderer } from './MoreMenuRenderer/MoreMenuRenderer';

// type DatasourcesTableProps = {
//   datasetId?: string;
// };

// export const DatasourcesTable: FC<DatasourcesTableProps> = observer(
//   function DatasourcesTable({ datasetId }) {
//     //const [datasources, setDatasources] = useState<IDatasource[] | undefined>(undefined);
//     //const [orderList, setOrderRecords] = useState<OrderBy[]>([]);

//     useEffect(() => {
//       datasourceTableService.setDataSet(datasetId);
//     }, [datasetId]);

//     const addDatasourceToDatasetModal = useOpen();

//     const activeUrl = useFileUrl(
//       datasourceTableService.activeRecord ? datasourceTableService.activeRecord.id : '',
//       datasourceTableService.activeRecord !== undefined
//     );

//     const getTypeSort = (key: string) => {
//       const dk = datasourceTableService.orders?.filter(el => el.field === key);

//       if (dk && dk.length) {
//         return dk[0].order;
//       }

//       return undefined;
//     };

//     const columns: TableColumnType<IDatasource>[] = [
//       {
//         dataIndex: 'type',
//         title: 'Type',
//         render: (type: IDatasource['type']) => <ArticleTypeRenderer articleType={type} />,
//       },
//       {
//         dataIndex: 'name',
//         title: (
//           <>
//             {getTypeSort('attrs, name') === OrderType.ASC ? <MenuArrowIcon /> : null} Name
//           </>
//         ),
//         render: (name: IDatasource['name']) => <ArticleNameRenderer title={name} />,
//         onCell: (record: IDatasource | null, rowIndex: number | undefined) => ({
//           onClick: () => {
//             console.log(record);
//             record && record.type === ArticleType.PDF
//               ? datasourceTableService.setActiveRecord(record)
//               : datasourceTableService.setActiveRecord(undefined);
//           },
//         }),
//         onHeaderCell: column => {
//           return {
//             onClick: () => {
//               datasourceTableService.setOrder([
//                 {
//                   field: 'attrs, name',
//                   order:
//                     datasourceTableService.orders &&
//                     datasourceTableService.orders[0].order === OrderType.ASC
//                       ? OrderType.DESC
//                       : OrderType.ASC,
//                 },
//               ]);
//             },
//           };
//         },
//       },
//       {
//         dataIndex: 'createDate',
//         title: 'Create date',
//         render: (date: Date) =>
//           date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
//       },
//       {
//         dataIndex: 'author',
//         title: 'Author',
//       },
//       {
//         dataIndex: 'lastUpdate',
//         title: 'Last update',
//         render: (date: Date) =>
//           date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
//       },
//       {
//         dataIndex: 'whoUpdated',
//         title: 'Who updated',
//       },
//       {
//         dataIndex: 'owners',
//         title: 'Owner',
//         render: (owners: IDatasource['owners']) => <OwnersRenderer owners={owners} />,
//       },
//       {
//         render: (_, datasource) => (
//           <MoreMenuRenderer
//             datasource={datasource}
//             onUpdate={(name, datasetId) => {
//               // const newDataset = datasourceTableService.datasources?.find(
//               //   foo => foo.id === datasetId
//               // );
//               // if (newDataset !== undefined) newDataset.name = name;
//               // if (datasourceTableService.datasources !== undefined) {
//               //   setDatasources([...datasources]);
//               // }
//             }}
//           />
//         ),
//       },
//     ];

//     //const [isLoading, setIsLoading] = useState(true);
//     //const [isError, setIsError] = useState(false);
//     //const [errorMessage, setErrorMessage] = useState('');

//     // const updateDataSetId = useMemo(() => {
//     //   console.log('tut');
//     //   //   setIsLoading(true);
//     //   //   datasourceTableService.setDatasources(undefined);
//     //   //   //setDatasources(undefined);
//     //   //   setIsError(false);

//     //   //   fetchDatasources(datasetId, datasourceTableService.orders)
//     //   //     .then(datasources => {
//     //   //       datasourceTableService.setDatasources(datasources);
//     //   //       setIsLoading(false);
//     //   //     })
//     //   //     .catch(res => {
//     //   //       setIsError(true);
//     //   //       setIsLoading(false);
//     //   //       setErrorMessage(res.message);
//     //   //     });
//     //   // }, [datasetId, datasourceTableService.orders]);

//     //   // useEffect(() => {
//     //   //   UpdateDatasources();
//     //   datasourceTableService.setDataSet(datasetId);
//     //   //datasourceTableService.updateDatasources(datasetId);
//     // }, [datasetId]);

//     const onSelect: SelectionSelectFn<IDatasource> = useCallback(
//       (record: IDatasource, selected: boolean) => {
//         datasourceTableService.selectDataSource(record, selected);
//       },
//       []
//     );

//     const rowSelection: TableRowSelection<any> = {
//       selectedRowKeys: datasourceTableService.selectedRows,
//       onSelect,
//     };

//     if (datasourceTableService.isError) {
//       return (
//         <Result
//           status="error"
//           subTitle={'Please, try again'}
//           title={'Failed to load datasources'}
//         />
//       );
//     }

//     return (
//       <>
//         <div className={style.toolbar}>
//           <ToolbarContext.Provider value={datasourceTableService}>
//             <ResultToolbar />
//           </ToolbarContext.Provider>
//         </div>
//         <div className={style.main}>
//           {/* {datasourceTableService.displaingType === DisplayingTypes.TABLE ?
//           (
//             <div
//               className={
//                 datasourceTableService.activeRecord
//                   ? style.leftPanelSlim
//                   : style.leftPanelWide
//               }
//             >
//               <Table
//                 columns={columns}
//                 dataSource={datasourceTableService.datasources}
//                 loading={datasourceTableService.isLoading}
//                 rowKey="id"
//                 rowSelection={rowSelection}
//               />
//             </div>
//           ) : (
//             <DatasourcesCards
//               datasources={datasourceTableService.datasources}
//               // setDataSources={datasourceTableService.setDatasources}
//             />
//           )} */}
//           {datasourceTableService.activeRecord && (
//             <div className={style.rightPanel}>
//               <ArticleViewPanel
//                 article={{
//                   id: datasourceTableService.activeRecord.id,
//                   url: activeUrl,
//                   title: datasourceTableService.activeRecord.name,
//                 }}
//               />
//             </div>
//           )}
//         </div>

//         <AddDatasourceToDatasetModal
//           isOpen={addDatasourceToDatasetModal.isOpen}
//           selectedDataSources={datasourceTableService.selectedRows}
//           onClose={addDatasourceToDatasetModal.close}
//         />
//       </>
//     );
//   }
// );
