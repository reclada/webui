import { action, makeObservable, observable, runInAction } from 'mobx';

import { IRecladaObject, ObjectAttributes } from 'src/api/IRecladaObject';
import { fetchObject, fetchObjectSchema } from 'src/api/objectService';
import {
  DisplayingTypes,
  OrderBy,
  OrderType,
  RecladaOrder,
} from 'src/shared/Sorting/Sorting';
import BaseListStore, { BaseListStoreType } from 'src/stores/BaseListStore';

class ObjectDataService {
  // private _listStore: BaseListStoreType = new BaseListStore<IRecladaObject>(
  //   1000,
  //   this.fetchData.bind(this)
  // );
  private className: string;
  // private attributes: ObjectAttributes | null = null;
  // @observable private dispType: DisplayingTypes = DisplayingTypes.TABLE;
  // @observable private aRecord: IRecladaObject | undefined;
  // @observable private loading: boolean = false;
  // @observable private error: boolean = false;
  // @observable private sortopen: boolean = false;
  // private errMsg: string = '';
  // @observable private orderList: RecladaOrder[] | undefined;
  // private get orderBy(): OrderBy[] {
  //   const result = new Array<OrderBy>();

  //   if (this.orderList) {
  //     this.orderList.map(value =>
  //       result.push({ field: value.field, order: value.order })
  //     );
  //   }

  //   return result;
  // }
  constructor(className: string) {
    this.className = className;
    makeObservable(this);
  }
  // get orders(): RecladaOrder[] | undefined {
  //   return this.orderList;
  // }
  // get enableOrders(): RecladaOrder[] {
  //   const result = [];

  //   for (var key in this.attributes) {
  //     if (this.attributes[key].isSorting) {
  //       result.push({
  //         name: this.attributes[key].caption,
  //         field: 'attributes, ' + key,
  //         order: OrderType.ASC,
  //       });
  //     }
  //   }

  //   return result;
  // }
  // get sortOpen(): boolean {
  //   return this.sortopen;
  // }
  // get displaingType(): DisplayingTypes {
  //   return this.dispType;
  // }
  // get activeRecord(): IRecladaObject | undefined {
  //   return this.aRecord;
  // }
  // get isLoading(): boolean {
  //   return this.loading;
  // }
  // get isError(): boolean {
  //   return this.error;
  // }
  // get errorMessage(): string {
  //   return this.errMsg;
  // }
  // get listStore(): BaseListStoreType {
  //   return this._listStore;
  // }
  // get count(): number {
  //   return this._listStore.count;
  // }
  // get updateRow() {
  //   return this._listStore.updateRow.bind(this._listStore);
  // }
  // init(className: string) {
  //   this.className = className;
  //   runInAction(() => {
  //     this.loading = true;
  //   });
  //   fetchObjectSchema(className)
  //     .then(result => {
  //       this.loading = false;
  //       this.attributes = result;
  //     })
  //     .catch(err => {
  //       runInAction(() => {
  //         this.loading = false;
  //         this.error = true;
  //         this.errMsg = '';
  //       });
  //     });
  //   this.initList();
  // }
  // // getRow(index: number): IRecladaObject | undefined {
  // //   return this._listStore.getRow(index) as IRecladaObject;
  // // }
  // updateList(index: number) {
  //   this._listStore.updateList(index);
  // }
  // initList() {
  //   this._listStore.initList();
  // }
  // @action
  // setObjects(datasets: IRecladaObject[]) {
  //   //this.datasetsList = datasets;
  // }
  // @action
  // setDisplaingType(displaingType: DisplayingTypes) {
  //   this.dispType = displaingType;
  //   this.listStore.setCurrentPage(0);
  // }
  // @action
  // setActiveRecord(activeRecord: IRecladaObject | undefined) {
  //   if (this.aRecord && activeRecord && this.aRecord.id === activeRecord.id) {
  //     this.aRecord = undefined;
  //   } else {
  //     this.aRecord = activeRecord;
  //   }
  // }
  // @action
  // setOrder(order: RecladaOrder[] | undefined) {
  //   this.orderList = order;
  //   this._listStore.clear();
  //   this._listStore.initList();
  // }
  // @action
  // setSortOpen(value: boolean) {
  //   this.sortopen = value;
  // }
  // fetchData(index: number, limit: number) {
  //   return fetchObject(this.className, this.orderBy, limit, index);
  // }
}

export const datasetsDataService = new ObjectDataService('DataSet');
