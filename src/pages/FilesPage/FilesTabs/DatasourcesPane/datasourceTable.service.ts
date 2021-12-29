import { off } from 'process';

import { cleanup } from '@testing-library/react';
import { action, computed, makeObservable, observable } from 'mobx';

import { fetchDatasources, IDatasource } from 'src/api/datasourcesService';
import BaseListStore, { BaseListStoreType } from 'src/stores/BaseListStore';
import { AttributeData, GridStore, GridStoreType } from 'src/stores/GridStore';
import {
  OrderBy,
  DisplayingTypes,
  RecladaOrder,
  OrderType,
  RecladaFilter,
  FiltersOperators,
  RFilter,
} from 'src/stores/Types';

class DatasourceTableService {
  private _listStore: BaseListStoreType = new BaseListStore<any>(
    1000,
    this.fetchData.bind(this) as any
  );

  private _gridStore: GridStoreType = new GridStore(
    {
      name: 'File',
      attributes: {
        type: {
          caption: 'Type',
          type: 'type',
          width: 50,
          maxWidth: 100,
        },
        name: {
          caption: 'Name',
          type: 'name',
          width: 250,
          maxWidth: 500,
        },
        createDate: {
          caption: 'Create Date',
          type: 'date',
          width: 250,
          maxWidth: 500,
        },
        author: {
          caption: 'Author',
          type: 'string',
          width: 250,
          maxWidth: 500,
        },
        lastUpdate: {
          caption: 'Last update',
          type: 'date',
          width: 250,
          maxWidth: 500,
        },
        whoUpdated: {
          caption: 'Who updated',
          type: 'string',
          width: 250,
          maxWidth: 500,
        },
        owners: {
          caption: 'Owners',
          type: 'array',
          width: 250,
          maxWidth: 500,
        },
      },
      columnsOrder: [
        'type',
        'name',
        'createDate',
        'author',
        'lastUpdate',
        'whoUpdated',
        'owners',
      ],
    },
    this.updateRowByOrder.bind(this)
  );
  private selectedRowKeys = observable.set<string>();

  @observable private dispType: DisplayingTypes = DisplayingTypes.TABLE;
  @observable private aRecord: IDatasource | undefined;
  @observable private dataSetId: string | undefined = '';

  @observable private orderList: RecladaOrder[] | undefined;
  @observable private _filters: RecladaFilter[] | undefined;
  //@observable private datasourcesList: IDatasource[] | undefined;

  private get orderBy(): OrderBy[] {
    if (this.orderList) {
      return this.orderList.map(value => {
        return { field: value.field, order: value.order };
      });
    }

    return [];
  }

  private get rFilter(): RFilter {
    const result: RFilter = {};

    if (this._filters) {
      this._filters.forEach(value => {
        result[value.key] = { operator: value.operator, object: value.object };
      });
    }

    return result;
  }

  constructor() {
    makeObservable(this);
  }

  @computed
  get selectedRows(): string[] {
    return Array.from(this.selectedRowKeys.values());
  }

  get enableOrders(): RecladaOrder[] {
    return [{ name: 'Name', field: 'attributes, name', order: OrderType.ASC }];
  }

  get enableFilters(): RecladaFilter[] {
    return [{ key: 'name', name: 'Name', operator: FiltersOperators.EQUAL, object: '' }];
  }

  get orders(): RecladaOrder[] | undefined {
    return this.orderList;
  }

  get filters(): RecladaFilter[] | undefined {
    return this._filters;
  }

  get isLoading(): boolean {
    return this._listStore.isLoading;
  }
  get isError(): boolean {
    return this._listStore.isError;
  }

  get listStore(): BaseListStoreType {
    return this._listStore;
  }

  get displaingType(): DisplayingTypes {
    return this.dispType;
  }

  get activeRecord(): IDatasource | undefined {
    return this.aRecord;
  }
  get count(): number {
    return this._listStore.count;
  }

  get coolumnOrder(): string[] {
    return this._gridStore.coolumnOrder;
  }

  get columnSelect(): number | undefined {
    return this._gridStore.selectColumn;
  }

  get rowDragging(): number | undefined {
    return this._gridStore.rowDragging;
  }

  get widthTable(): number {
    return this._gridStore.withTable;
  }

  updateRow(index: number, elem: IDatasource) {
    return this._listStore.updateRow(index, elem as any);
  }

  getAttributeDataByIndex(index: number): AttributeData {
    return this._gridStore.getAttributeDataByIndex(index);
  }

  getKeyByIndex(index: number): string {
    return this._gridStore.getKeyByIndex(index);
  }

  getOffsetColumn(index: number): number {
    return this._gridStore.getOffsetColumn(index);
  }

  setColumnOrder(index: number, ofset: number) {
    this._gridStore.setColumnOrder(index, ofset);
  }

  updateRowByOrder(index: number, index2: number) {
    //console.log(index, delta);
    const t1 = this._listStore.getRow(index);
    const t2 = this._listStore.getRow(index2);

    if (t1 && t2) {
      this._listStore.updateRow(index, t2);
      this._listStore.updateRow(index2, t1);
    }
  }

  setOrderRow(index: number) {
    this._gridStore.setRowOrder(index);
  }

  setRowForSwap(index: number | undefined) {
    this._gridStore.setRowForSwap(index);
  }

  getRow(index: number): IDatasource | undefined {
    return this._listStore.getRow(index) as any;
  }

  updateList(index: number) {
    this._listStore.updateList(index);
  }

  initList() {
    this._listStore.initList();
  }

  @action
  cleanup() {
    this.selectedRowKeys.clear();
  }

  @action
  selectDataSource(dataSource: IDatasource, selected: boolean) {
    if (selected) {
      this.selectedRowKeys.add(dataSource['{GUID}:string']);
    } else {
      this.selectedRowKeys.delete(dataSource['{GUID}:string']);
    }
  }

  isColumnCustomWidth(index: number): boolean {
    return this._gridStore.isColumnCustomWidth(index);
  }

  setColumnCustomWidth(index: number, remove?: boolean) {
    return this._gridStore.setColumnCustomWidth(index, remove);
  }

  @action
  setDisplaingType(displaingType: DisplayingTypes) {
    this.dispType = displaingType;
  }

  setColumnWidth(index: number, offset: number) {
    this._gridStore.setColumnWidth(index, offset);
  }

  @action
  setDataSet(value: string | undefined) {
    this.dataSetId = value;
    this._listStore.clear();
    this._listStore.initList();
  }

  @action
  setActiveRecord(activeRecord: IDatasource | undefined) {
    if (
      this.aRecord &&
      activeRecord &&
      this.aRecord['{GUID}:string'] === activeRecord['{GUID}:string']
    ) {
      this.aRecord = undefined;
    } else {
      this.aRecord = activeRecord;
    }
  }

  @action
  setFilters(filters: RecladaFilter[] | undefined) {
    this._filters = filters;
    this._listStore.clear();
    this._listStore.initList();
  }

  @action
  setOrder(order: RecladaOrder[] | undefined) {
    this.orderList = order;
    this._listStore.clear();
    this._listStore.initList();
  }

  fetchData(offset: number, limit: number) {
    return fetchDatasources(this.dataSetId, this.orderBy, limit, offset, this.rFilter);
  }

  setColumnSelect(index: number | undefined) {
    this._gridStore.setColumnSelect(index);
  }

  setRowDragging(index: number | undefined) {
    this._gridStore.setRowDragging(index);
  }
}
/////
export const datasourceTableService = new DatasourceTableService();
