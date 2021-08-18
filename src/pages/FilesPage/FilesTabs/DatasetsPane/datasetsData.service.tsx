import { action, makeObservable, observable } from 'mobx';

import { IDataset } from 'src/api/datasetsDataGateService';
import { DisplayingTypes } from 'src/Sorting';
import { OrderBy } from 'src/Sorting';

class DatasetsDataService {
  @observable private dispType: DisplayingTypes = DisplayingTypes.TABLE;
  @observable private aRecord: IDataset | undefined;

  private orderList = observable.set<OrderBy>();

  constructor() {
    makeObservable(this);
  }

  get displaingType(): DisplayingTypes {
    return this.dispType;
  }

  get activeRecord(): IDataset | undefined {
    return this.aRecord;
  }

  @action
  setDisplaingType(displaingType: DisplayingTypes) {
    this.dispType = displaingType;
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

export const datasetsDataService = new DatasetsDataService();
