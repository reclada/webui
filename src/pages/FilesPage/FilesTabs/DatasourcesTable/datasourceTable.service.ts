import { action, computed, makeObservable, observable } from 'mobx';

import { IDatasource, OrderBy } from 'src/api/datasourcesService';
import { DisplayingTypes } from 'src/pages/SearchResultPage/SearchResultMain/ResultToolbar/ResultToolbar';

class DatasourceTableService {
  private selectedRowKeys = observable.set<string>();

  @observable private displaingType: DisplayingTypes = DisplayingTypes.TABLE;
  @observable private activeRecord: IDatasource | undefined;

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

  get DisplaingType(): DisplayingTypes {
    return this.displaingType;
  }

  get ActiveRecord(): IDatasource | undefined {
    return this.activeRecord;
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

export const datasourceTableService = new DatasourceTableService();
