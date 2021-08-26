import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { fetchDatasources, IDatasource } from 'src/api/datasourcesService';
import { DisplayingTypes } from 'src/Sorting';
import { OrderBy } from 'src/Sorting';

class DatasourceTableService {
  private selectedRowKeys = observable.set<string>();

  @observable private dispType: DisplayingTypes = DisplayingTypes.TABLE;
  @observable private aRecord: IDatasource | undefined;
  @observable private loading: boolean = false;
  @observable private error: boolean = false;
  @observable private dataSetId: string | undefined = '';

  @observable private orderList: OrderBy[] | undefined;
  @observable private datasourcesList: IDatasource[] | undefined;

  private errMsg: string = '';

  @computed
  get selectedRows(): string[] {
    return Array.from(this.selectedRowKeys.values());
  }

  get orders(): OrderBy[] | undefined {
    return this.orderList;
  }

  get datasources(): IDatasource[] | undefined {
    return this.datasourcesList;
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

  get displaingType(): DisplayingTypes {
    return this.dispType;
  }

  get ActiveRecord(): IDatasource | undefined {
    return this.aRecord;
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

  @action
  setDisplaingType(displaingType: DisplayingTypes) {
    this.dispType = displaingType;
  }

  @action
  setDataSet(value: string | undefined) {
    this.dataSetId = value;
    this.updateDatasources();
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
  setOrder(order: OrderBy[] | undefined) {
    this.orderList = order;
    this.updateDatasources();
  }

  updateDatasources() {
    runInAction(() => {
      this.loading = true;
    });
    fetchDatasources(this.dataSetId, this.orders ? this.orders : [])
      .then(datasources => {
        runInAction(() => {
          this.datasourcesList = datasources;
          this.loading = false;
          this.error = false;
        });
      })
      .catch(res => {
        runInAction(() => {
          this.error = true;
          this.loading = false;
          this.errMsg = res.message;
        });
      });
  }
}

export const datasourceTableService = new DatasourceTableService();
