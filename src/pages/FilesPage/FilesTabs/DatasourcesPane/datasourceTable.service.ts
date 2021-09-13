import { action, computed, makeObservable, observable } from 'mobx';

import { fetchDatasources, IDatasource } from 'src/api/datasourcesService';
import {
  OrderBy,
  DisplayingTypes,
  RecladaOrder,
  OrderType,
} from 'src/shared/Sorting/Sorting';
import BaseListStore, { BaseListStoreType } from 'src/stores/BaseListStore';

class DatasourceTableService {
  private _listStore: BaseListStoreType = new BaseListStore<IDatasource>(
    1000,
    this.fetchData.bind(this)
  );
  private selectedRowKeys = observable.set<string>();

  @observable private dispType: DisplayingTypes = DisplayingTypes.TABLE;
  @observable private aRecord: IDatasource | undefined;
  @observable private loading: boolean = false;
  @observable private error: boolean = false;
  @observable private dataSetId: string | undefined = '';
  private errMsg: string = '';

  @observable private orderList: RecladaOrder[] | undefined;
  //@observable private datasourcesList: IDatasource[] | undefined;

  private get orderBy(): OrderBy[] {
    const result = new Array<OrderBy>();

    if (this.orderList) {
      this.orderList.map(value =>
        result.push({ field: value.field, order: value.order })
      );
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

  get orders(): RecladaOrder[] | undefined {
    return this.orderList;
  }

  get isLoading(): boolean {
    return this.loading;
  }
  get isError(): boolean {
    return this.error;
  }

  get errorMessage(): string {
    return this.errMsg;
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
      this.selectedRowKeys.add(dataSource.id);
    } else {
      this.selectedRowKeys.delete(dataSource.id);
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
    if (this.aRecord && activeRecord && this.aRecord.id === activeRecord.id) {
      this.aRecord = undefined;
    } else {
      this.aRecord = activeRecord;
    }
  }

  @action
  setOrder(order: RecladaOrder[] | undefined) {
    this.orderList = order;
    this._listStore.clear();
    this._listStore.initList();
  }

  fetchData(offset: number, limit: number) {
    return fetchDatasources(this.dataSetId, this.orderBy, limit, offset);
  }
}

export const datasourceTableService = new DatasourceTableService();
