import { Row, Col, Checkbox } from 'antd';
// import { CheckboxChangeEvent } from 'antd/lib/checkbox';
// import { observer } from 'mobx-react-lite';
// import React, { CSSProperties, FC, useCallback, useContext, useMemo } from 'react';
// import { ListChildComponentProps } from 'react-window';

// import { IRecladaObject } from 'src/api/IRecladaObject';

// import { ArticleNameRenderer } from '../../DatasourcesPane/DatasourcesTable/ArticleNameRenderer/ArticleNameRenderer';
// import { ArticleTypeRenderer } from '../../DatasourcesPane/DatasourcesTable/ArticleTypeRenderer/ArticleTypeRenderer';
// import { MoreMenuRenderer } from '../../DatasourcesPane/DatasourcesTable/MoreMenuRenderer/MoreMenuRenderer';
// import { datasourceTableService } from '../../DatasourcesPane/datasourceTable.service';
// import { OwnersRenderer } from '../../shared/OwnersRenderer/OwnersRenderer';
// import { DataKey } from '../objectdata.service';
// // import { ArticleNameRenderer } from '../DatasourcesTable/ArticleNameRenderer/ArticleNameRenderer';
// // import { ArticleTypeRenderer } from '../DatasourcesTable/ArticleTypeRenderer/ArticleTypeRenderer';
// // import { MoreMenuRenderer } from '../DatasourcesTable/MoreMenuRenderer/MoreMenuRenderer';

// import styleModule from './ObjectTableRow.module.scss';

// interface IServiceTableRow {
//   getStruct: () => DataKey[];
//   getRow: (index: number) => IRecladaObject;
//   updateList: (index: number) => void;
//   updateRow: (index: number, value: IRecladaObject) => void;
//   onSelect: (value: IRecladaObject, checked: boolean) => void;
// }

// type ObjectTableRowProps = {
//   rowIndex: number;
//   columnIndex: number;
//   style: CSSProperties;
//   isScrolling?: boolean;
//   data: IServiceTableRow;
// };

// export const ObjectTableRow: FC<ObjectTableRowProps> = observer(function ObjectTableRow({
//   rowIndex,
//   columnIndex,
//   isScrolling,
//   style,
//   data,
// }) {
//   const recladaObject: IRecladaObject = useMemo(() => data.getRow(rowIndex), [
//     data,
//     rowIndex,
//   ]);

//   if (!recladaObject && !isScrolling) {
//     data.updateList(rowIndex);
//   }

//   const keys: string[] = useMemo(() => data.getKeys(), [data]);

//   // const onUpdate = useCallback(
//   //   (name: string) => {
//   //     if (recladaObject) {
//   //       recladaObject.name = name;
//   //       data.updateRow(index, recladaObject);
//   //     }
//   //   },
//   //   [recladaObject, index, data]
//   // );

//   const columnType = useMemo(() => {
//     const keyColumn = data.getKeys()[columnIndex];
//     let dataColumn = recladaObject.attrs[keyColumn];
//     if ()
//     if (Date.parse(dataColumn) !== NaN) {
//       const date = new Date(dataColumn);

//       return (
//         <Col span={3}>
//           {date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()}
//         </Col>
//       );
//     }

//   }, [columnIndex, recladaObject, data]);

//   const onSelect = useCallback(
//     (event: CheckboxChangeEvent) => {
//       if (recladaObject) {
//         data.onSelect(recladaObject, event.target.checked);
//       }
//     },
//     [recladaObject, data]
//   );

//   return (
//     <div style={style}>
//       {!recladaObject ? (
//         <Col className={styleModule.rowTable}></Col>
//       ) : (
//         <Row className={styleModule.rowTable}>
//           <Col span={1}>
//             <Checkbox
//               checked={
//                 datasourceTableService.selectedRows.filter(
//                   chel => recladaObject.id === chel
//                 ).length > 0
//               }
//               className={styleModule.checkboxCard}
//               onChange={onSelect}
//             />
//           </Col>
//           <Col span={1}>
//             <ArticleTypeRenderer articleType={datasource.type} />
//           </Col>
//           <Col
//             span={4}
//             onClick={() => datasourceTableService.setActiveRecord(datasource)}
//           >
//             <ArticleNameRenderer
//               className={styleModule.nameCard}
//               title={datasource.name}
//             />
//           </Col>
//           <Col span={3}>
//             {datasource.createDate.getDate() +
//               '-' +
//               datasource.createDate.getMonth() +
//               '-' +
//               datasource.createDate.getFullYear()}
//           </Col>
//           <Col span={4}>{datasource.author}</Col>
//           <Col span={3}>
//             {datasource.lastUpdate.getDate() +
//               '-' +
//               datasource.lastUpdate.getMonth() +
//               '-' +
//               datasource.lastUpdate.getFullYear()}
//           </Col>
//           <Col span={4}>{datasource.whoUpdated}</Col>
//           <Col span={3}>
//             <OwnersRenderer owners={datasource.owners} />
//           </Col>
//           <Col span={1}>
//             <MoreMenuRenderer datasource={datasource} onUpdate={onUpdate} />
//           </Col>
//         </Row>
//       )}
//     </div>
//   );
// });
