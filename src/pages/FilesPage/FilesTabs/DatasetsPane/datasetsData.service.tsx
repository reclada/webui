import { action, makeObservable, observable } from 'mobx';

import { fetchDatasets, IDataset } from 'src/api/datasetsDataGateService';
import {
  DisplayingTypes,
  OrderBy,
  OrderType,
  RecladaOrder,
} from 'src/shared/Sorting/Sorting';
import BaseListStore, { BaseListStoreType } from 'src/stores/BaseListStore';

class DatasetsDataService {
  private _listStore: BaseListStoreType = new BaseListStore<IDataset>(
    1000,
    this.fetchData.bind(this)
  );
  @observable private dispType: DisplayingTypes = DisplayingTypes.TABLE;
  @observable private aRecord: IDataset | undefined;
  @observable private loading: boolean = false;
  @observable private error: boolean = false;
  @observable private sortopen: boolean = false;
  private errMsg: string = '';

  @observable private orderList: RecladaOrder[] | undefined;

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

  get orders(): RecladaOrder[] | undefined {
    return this.orderList;
  }

  get enableOrders(): RecladaOrder[] {
    return [
      { name: 'Name', field: 'attributes, name', order: OrderType.ASC },
      // { name: 'Created date', field: 'attributes, SomeDate', order: OrderType.ASC },
    ];
  }

  get sortOpen(): boolean {
    return this.sortopen;
  }

  get displaingType(): DisplayingTypes {
    return this.dispType;
  }

  get activeRecord(): IDataset | undefined {
    return this.aRecord;
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

  get count(): number {
    return this._listStore.count;
  }

  get updateRow() {
    return this._listStore.updateRow.bind(this._listStore);
  }

  getRow(index: number): IDataset | undefined {
    return this._listStore.getRow(index) as IDataset;
  }

  updateList(index: number) {
    this._listStore.updateList(index);
  }

  initList() {
    this._listStore.initList();
  }

  @action
  setDatasets(datasets: IDataset[]) {
    //this.datasetsList = datasets;
  }

  @action
  setDisplaingType(displaingType: DisplayingTypes) {
    this.dispType = displaingType;
    this.listStore.setCurrentPage(0);
  }

  @action
  setActiveRecord(activeRecord: IDataset | undefined) {
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

  @action
  setSortOpen(value: boolean) {
    this.sortopen = value;
  }

  fetchData(index: number, limit: number) {
    return fetchDatasets(this.orderBy, limit, index);
  }
}

export const datasetsDataService = new DatasetsDataService();
