import { action, makeObservable, observable, runInAction } from 'mobx';
import { computedFn } from 'mobx-utils';

import { fetchDatasets, IDataset } from 'src/api/datasetsDataGateService';
import { DisplayingTypes } from 'src/Sorting';
import { OrderBy } from 'src/Sorting';
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
  private errMsg: string = '';

  @observable private orderList: OrderBy[] | undefined;

  constructor() {
    makeObservable(this);
  }

  get orders(): OrderBy[] | undefined {
    return this.orderList;
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
  setOrder(order: OrderBy[] | undefined) {
    this.orderList = order;
    this._listStore.clear();
    this._listStore.initList();
  }

  fetchData(index: number) {
    return fetchDatasets(this.orderList ? this.orderList : [], 1000, index);
  }
}

export const datasetsDataService = new DatasetsDataService();
