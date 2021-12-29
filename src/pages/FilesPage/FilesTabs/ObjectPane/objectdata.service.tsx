import { action, computed, makeObservable, observable } from 'mobx';

import { IRecladaObject, RecladaObjectClass } from 'src/api/IRecladaObject';
import { fetchObject } from 'src/api/objectService';
import BaseListStore from 'src/stores/BaseListStore';
import {
  DisplayingTypes,
  FiltersOperators,
  OrderBy,
  OrderType,
  RecladaFilter,
  RecladaOrder,
  RFilter,
} from 'src/stores/Types';

type BaseListStoreType = BaseListStore<IRecladaObject>;

export class ObjectDataService {
  private _listStore = new BaseListStore<IRecladaObject>(40, this.fetchData.bind(this));
  private className: RecladaObjectClass;
  // private attributes: ObjectAttributes | null = null;
  @observable private dispType: DisplayingTypes = DisplayingTypes.TABLE;
  @observable private aRecord: IRecladaObject | undefined;
  @observable private error: boolean = false;
  @observable private sortopen: boolean = false;
  private errMsg: string = '';
  @observable private orderList: RecladaOrder[] | undefined;
  private selectedRowKeys = observable.set<string>();
  @observable private _selectedColumn: number | undefined;
  @observable private _filters: RecladaFilter[] | undefined;

  private get orderBy(): OrderBy[] {
    const result = new Array<OrderBy>();

    if (this.orderList) {
      this.orderList.map(value =>
        result.push({ field: value.field, order: value.order })
      );
    }

    return result;
  }

  constructor(className: RecladaObjectClass) {
    this.className = className;
    makeObservable(this);
  }

  get orders(): RecladaOrder[] | undefined {
    return this.orderList;
  }

  get enableOrders(): RecladaOrder[] {
    const result = Object.entries(this._listStore.tableDisplay.columns).map(
      ([key, value]) => ({
        name: value.caption,
        field: key.replace(/:.+/g, ''),
        order: OrderType.ASC,
      })
    );

    return result;
  }

  get sortOpen(): boolean {
    return this.sortopen;
  }

  get displayingType(): DisplayingTypes {
    return this.dispType;
  }

  get activeRecord(): IRecladaObject | undefined {
    return this.aRecord;
  }

  get isLoading(): boolean {
    return this.listStore.isLoading;
  }

  get isError(): boolean {
    return this.listStore.isError;
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

  get objectClass() {
    return this.className;
  }

  @computed
  get selectedRows(): string[] {
    return Array.from(this.selectedRowKeys.values());
  }

  @computed
  get widthTable(): number {
    return this._listStore.tableDisplay.orderColumn.reduce(
      (acc, column) => acc + (this._listStore.tableDisplay.columns[column].width ?? 0),
      0
    );
  }

  get selectedColumn() {
    return this._selectedColumn;
  }

  get currentPage() {
    return this.listStore.currentPage;
  }

  get pageSize() {
    return this.listStore.pageSize;
  }

  get filters(): RecladaFilter[] | undefined {
    return this._filters;
  }

  private get rFilter() {
    if (this._filters) {
      const result: RFilter = {};

      this._filters.forEach(value => {
        result[value.key] = { operator: value.operator, object: value.object };
      });

      return result;
    }

    return undefined;
  }

  get enableFilters(): RecladaFilter[] {
    return [{ key: 'name', name: 'Name', operator: FiltersOperators.EQUAL, object: '' }];
  }

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

  getRow(index: number): IRecladaObject | undefined {
    return this._listStore.getRow(index) as IRecladaObject;
  }

  updateList(index: number) {
    this._listStore.updateList(index);
  }

  initList() {
    this.selectedRowKeys.clear();
    this._listStore.initList();
  }

  @action
  setObjects(datasets: IRecladaObject[]) {
    //this.datasetsList = datasets;
  }

  @action
  setDisplayingType(displayingType: DisplayingTypes) {
    this.dispType = displayingType;
    this.listStore.setCurrentPage(0);
  }

  @action
  setActiveRecord(activeRecord: IRecladaObject | undefined) {
    if (
      this.aRecord &&
      activeRecord &&
      this.aRecord['{GUID}'] === activeRecord['{GUID}']
    ) {
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
    return fetchObject(this.className, this.orderBy, limit, index, ({
      operator: 'LIKE',
      value: ['{attributes,name}', 'V%v%'],
    } as unknown) as RFilter);
  }

  getIsObjectSelected(id: string) {
    return this.selectedRows.includes(id);
  }

  @action
  toggleSelection(id: string) {
    const isSelected = this.getIsObjectSelected(id);

    if (isSelected) {
      this.selectedRowKeys.delete(id);
    } else {
      this.selectedRowKeys.add(id);
    }
  }

  @action
  selectColumn(index: number | undefined) {
    this._selectedColumn = index;
  }

  @action
  setColumnOrder(index: number, offset: number) {
    this._listStore.setColumnOrder(index, offset);
  }

  @action
  setFilters(filters: RecladaFilter[] | undefined) {
    this._filters = filters;
    this._listStore.clear();
    this._listStore.initList();
  }
}

export const objectDataService = new ObjectDataService(RecladaObjectClass.File);
