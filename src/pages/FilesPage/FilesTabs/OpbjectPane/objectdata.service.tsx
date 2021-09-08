import { action, computed, makeObservable, observable } from 'mobx';

import { OrderBy, DisplayingTypes } from 'src/shared/Sorting/Sorting';

import { IDatasource } from '../../../../api/datasourcesService';

class ObjectDataService {
  private selectedRowKeys = observable.set<string>();

  @observable private displaingType: DisplayingTypes = DisplayingTypes.TABLE;
  @observable private activeRecord: IDatasource | undefined;
  @observable private loading: boolean = true;
  @observable private error: boolean = true;
  @observable private errMsg: string = '';

  private orderList = observable.set<OrderBy>();

  constructor() {
    makeObservable(this);
  }

  @computed
  get selectedRows(): string[] {
    return Array.from(this.selectedRowKeys.values());
  }

  get DisplaingType(): DisplayingTypes {
    return this.displaingType;
  }

  get ActiveRecord(): IDatasource | undefined {
    return this.activeRecord;
  }

  get isLoading(): boolean {
    return this.loading;
  }

  get isError(): boolean {
    return this.loading;
  }

  get errorMessage(): string {
    return this.errMsg;
  }

  @action
  setErrorMessage(value: string): void {
    this.errMsg = value;
  }

  @action
  setIsLoading(value: boolean): void {
    this.loading = value;
  }

  @action
  setIsError(value: boolean): void {
    this.loading = value;
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
    this.displaingType = displaingType;
  }

  @action
  setActiveRecord(activeRecord: IDatasource | undefined) {
    if (this.activeRecord && activeRecord && this.activeRecord.id === activeRecord.id) {
      this.activeRecord = undefined;
    } else {
      this.activeRecord = activeRecord;
    }
  }

  @action
  setOrderList(order: OrderBy, remove: boolean) {
    if (remove) {
      this.orderList.delete(order);
    } else {
      this.orderList.add(order);
    }
  }

  @action
  cleanupOrder() {
    this.orderList.clear();
  }
}

export const objectDataService = new ObjectDataService();
