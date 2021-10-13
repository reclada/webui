import { action, computed, makeObservable, observable } from 'mobx';

import { fetchDatasources, IDatasource } from 'src/api/datasourcesService';
import BaseListStore, { BaseListStoreType } from 'src/stores/BaseListStore';
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
  private _listStore: BaseListStoreType = new BaseListStore<IDatasource>(
    1000,
    this.fetchData.bind(this)
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

  get updateRow() {
    return this._listStore.updateRow.bind(this._listStore);
  }

  getRow(index: number): IDatasource | undefined {
    return this._listStore.getRow(index) as IDatasource;
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
      this.selectedRowKeys.add(dataSource.GUID);
    } else {
      this.selectedRowKeys.delete(dataSource.GUID);
    }
  }

  @action
  setDisplaingType(displaingType: DisplayingTypes) {
    this.dispType = displaingType;
  }

  @action
  setDataSet(value: string | undefined) {
    this.dataSetId = value;
    this._listStore.clear();
    this._listStore.initList();
  }

  @action
  setActiveRecord(activeRecord: IDatasource | undefined) {
    if (this.aRecord && activeRecord && this.aRecord.GUID === activeRecord.GUID) {
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
}
/////
export const datasourceTableService = new DatasourceTableService();
