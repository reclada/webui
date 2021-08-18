import { action, computed, makeObservable, observable } from 'mobx';

import { IDatasource } from 'src/api/datasourcesService';
import { DisplayingTypes } from 'src/Sorting';
import { OrderBy } from 'src/Sorting';

class DatasourceTableService {
  private selectedRowKeys = observable.set<string>();

  @observable private dispType: DisplayingTypes = DisplayingTypes.TABLE;
  @observable private aRecord: IDatasource | undefined;

  private orderList = observable.set<OrderBy>();

  @computed
  get selectedRows(): string[] {
    return Array.from(this.selectedRowKeys.values());
  }

  constructor() {
    makeObservable(this);
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

  get displaingType(): DisplayingTypes {
    return this.dispType;
  }

  get ActiveRecord(): IDatasource | undefined {
    return this.aRecord;
  }

  @action
  setDisplaingType(displaingType: DisplayingTypes) {
    this.dispType = displaingType;
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

export const datasourceTableService = new DatasourceTableService();
