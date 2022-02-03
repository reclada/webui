import { action, makeObservable, observable } from 'mobx';

import { fetchDatasets, IDataset } from 'src/api/datasetsDataGateService';
import BaseListStore, { BaseListStoreType } from 'src/stores/BaseListStore';
import {
  DisplayingTypes,
  FiltersOperators,
  OrderBy,
  OrderType,
  RecladaFilter,
  RecladaOrder,
  RFilter,
} from 'src/stores/Types';

class DatasetsDataService {
  private _listStore: BaseListStoreType = new BaseListStore<IDataset>(
    1000,
    this.fetchData.bind(this)
  );
  @observable private dispType: DisplayingTypes = DisplayingTypes.TABLE;
  @observable private aRecord: IDataset | undefined;
  @observable private sortopen: boolean = false;

  @observable private orderList: RecladaOrder[] | undefined;
  @observable private _filters: RecladaFilter[] | undefined;

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

  get orders(): RecladaOrder[] | undefined {
    return this.orderList;
  }

  get enableOrders(): RecladaOrder[] {
    return [
      { name: 'Name', field: 'attributes, name', order: OrderType.ASC },
      // { name: 'Created date', field: 'attributes, SomeDate', order: OrderType.ASC },
    ];
  }

  get enableFilters(): RecladaFilter[] {
    return [{ key: 'name', name: 'Name', operator: FiltersOperators.EQUAL, object: '' }];
  }

  get sortOpen(): boolean {
    return this.sortopen;
  }

  get filters(): RecladaFilter[] | undefined {
    return this._filters;
  }

  get displaingType(): DisplayingTypes {
    return this.dispType;
  }

  get activeRecord(): IDataset | undefined {
    return this.aRecord;
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

  @action
  setSortOpen(value: boolean) {
    this.sortopen = value;
  }

  fetchData(index: number, limit: number) {
    return fetchDatasets(this.orderBy, limit, index);
  }
}

export const datasetsDataService = new DatasetsDataService();
