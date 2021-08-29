import { Result } from 'antd';
// import { SelectionSelectFn } from 'antd/lib/table/interface';
// import { observer } from 'mobx-react-lite';
// import React, { FC, useCallback, useEffect } from 'react';

// import { IDataset } from 'src/api/datasetsDataGateService';
// import style from 'src/pages/SearchResultPage/SearchResultMain/SearchResultMain.module.scss';
// import {
//   ResultToolbar,
//   ToolbarContext,
// } from 'src/pages/shared/ResultToolbar/ResultToolbar';
// import { DisplayingTypes, OrderType } from 'src/Sorting';

// import { IDatasource } from '../../../../api/datasourcesService';
// import { DatasourcesTable } from '../DatasourcesTable/DatasourcesTable';
// import { datasourceTableService } from '../DatasourcesTable/datasourceTable.service';

// import { DatasetsCards } from './DatasetsCards/DatasetsCards';
// import { datasetsDataService } from './datasetsData.service';
// import { DatasetsPaneBreadcrumbs } from './DatasetsPaneBreadcrumbs/DatasetsPaneBreadcrumbs';
// import { DatasetsTable } from './DatasetsTable/DatasetsTable';
// import { DatasetsTableInfinity } from './DatasetsTableInfinity/DatasetsTableInfinity';

// type DatasourcesPaneProps = {
//   datasetId?: string;
// };

// export const DatasourcesPane: FC = observer(function DatasourcesPane({ datasetId }) {
//   useEffect(() => {
//     datasourceTableService.setDataSet(datasetId);
//   }, [datasetId]);

//   const addDatasourceToDatasetModal = useOpen();

//   const activeUrl = useFileUrl(
//     datasourceTableService.ActiveRecord ? datasourceTableService.ActiveRecord.id : ''
//   );

//   const handleUnselectDataset = useCallback(() => {
//     datasetsDataService.setActiveRecord(undefined);
//     //setSelectedDataset(undefined);
//   }, []);

//   const onClickHeader = (key: string) => {
//     const dk = datasetsDataService.orders?.filter(el => el.field === key);

//     if (dk && dk.length) {
//       datasetsDataService.setOrder([
//         {
//           field: key,
//           order: dk[0].order === OrderType.ASC ? OrderType.DESC : OrderType.ASC,
//         },
//       ]);
//     } else {
//       datasetsDataService.setOrder([
//         {
//           field: key,
//           order: OrderType.DESC,
//         },
//       ]);
//     }
//   };

//   const onSelect: SelectionSelectFn<IDatasource> = useCallback(
//     (record: IDatasource, selected: boolean) => {
//       datasourceTableService.selectDataSource(record, selected);
//     },
//     []
//   );

//   if (datasourceTableService.isError) {
//     return (
//       <Result
//         status="error"
//         subTitle={'Please, try again'}
//         title={'Failed to load datasources'}
//       />
//     );
//   }

//   const service = {
//     datasets: () => {
//       return datasourceTableService.datasources ? datasetsDataService.datasets : [];
//     },
//     setOffset: async (value: number) => {
//       await datasourceTableService.setOffset(value);
//     },
//     getOffsetValue: () => datasourceTableService.offsetValue,
//     getElemNumber: () => datasourceTableService.elemNumber,
//   };

//   if (datasetsDataService.isError) {
//     return (
//       <Result
//         status="error"
//         subTitle={'Please, try again'}
//         title={'Failed to load datasets'}
//       />
//     );
//   }

//   const content =
//     datasetsDataService.displaingType === DisplayingTypes.TABLE ? (
//       // <DatasetsTable
//       //   datasets={datasetsDataService.datasets}
//       //   isLoading={datasetsDataService.isLoading}
//       //   onClickHeader={onClickHeader}
//       //   onSelectDataset={onSelect}
//       //   onUpdate={(name, datasetId) => {
//       //     const newDataset = datasetsDataService.datasets?.find(
//       //       dataset => dataset.id === datasetId
//       //     );

//       //     if (newDataset !== undefined) newDataset.title = name;

//       //     //if (datasets !== undefined) setDatasets([...datasets]);
//       //   }}
//       // />
//       <DatasetsTableInfinity
//         service={service}
//         onClickHeader={onClickHeader}
//         onSelect={onSelect}
//         onUpdate={(name, datasetId) => {
//           const newDataset = datasetsDataService.datasets?.find(
//             dataset => dataset.id === datasetId
//           );

//           if (newDataset !== undefined) newDataset.title = name;

//           //if (datasets !== undefined) setDatasets([...datasets]);
//         }}
//       ></DatasetsTableInfinity>
//     ) : (
//       <DatasetsCards
//         service={service}
//         onSelect={onSelect}
//         onUpdate={(name, datasetId) => {
//           const newDataset = datasetsDataService.datasets?.find(
//             dataset => dataset.id === datasetId
//           );

//           if (newDataset !== undefined) newDataset.title = name;

//           if (datasetsDataService.datasets !== undefined)
//             datasetsDataService.setDatasets([...datasetsDataService.datasets]);
//         }}
//       ></DatasetsCards>
//     );

//   return (
//     <>
//       {datasetsDataService.activeRecord !== undefined ? (
//         <>
//           <DatasetsPaneBreadcrumbs
//             selectedDataset={datasetsDataService.activeRecord}
//             onUnselectDataset={handleUnselectDataset}
//           />
//           <DatasourcesTable datasetId={datasetsDataService.activeRecord.id} />
//         </>
//       ) : (
//         <>
//           <div className={style.toolbar}>
//             <ToolbarContext.Provider value={datasetsDataService}>
//               <ResultToolbar />
//             </ToolbarContext.Provider>
//           </div>
//           <div className={style.main}>
//             <div className={style.leftPanelWide}>
//               {datasetsDataService.isLoading ? null : content}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// });
