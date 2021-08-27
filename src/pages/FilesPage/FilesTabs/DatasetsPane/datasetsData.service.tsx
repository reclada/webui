import { action, makeObservable, observable, runInAction } from 'mobx';

import { fetchDatasets, IDataset } from 'src/api/datasetsDataGateService';
import { DisplayingTypes } from 'src/Sorting';
import { OrderBy } from 'src/Sorting';

class DatasetsDataService {
  @observable private dispType: DisplayingTypes = DisplayingTypes.TABLE;
  @observable private aRecord: IDataset | undefined;
  @observable private loading: boolean = false;
  @observable private error: boolean = false;
  private errMsg: string = '';
  private offset: number = 0;

  @observable private orderList: OrderBy[] | undefined;
  @observable private datasetsList: IDataset[] | undefined;
  private count: number = 0;

  constructor() {
    makeObservable(this);
  }

  get elemNumber(): number {
    return this.count;
  }

  get orders(): OrderBy[] | undefined {
    return this.orderList;
  }

  get displaingType(): DisplayingTypes {
    return this.dispType;
  }

  get datasets(): IDataset[] | undefined {
    return this.datasetsList;
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

  get offsetValue(): number {
    return this.offset;
  }

  @action
  setDatasets(datasets: IDataset[]) {
    this.datasetsList = datasets;
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
  setOrder(order: OrderBy[] | undefined) {
    this.orderList = order;
    this.offset = 0;
    this.updateDatasets();
  }

  async setOffset(value: number) {
    const resp = await fetchDatasets(this.orderList ? this.orderList : [], 30, value);

    this.offset = value;
    runInAction(() => {
      this.datasetsList = resp.objects;
      this.count = resp.number;
    });
  }

  updateDatasets() {
    runInAction(() => {
      this.loading = true;
    });
    fetchDatasets(this.orderList ? this.orderList : [], 30, this.offset)
      .then(datasets => {
        runInAction(() => {
          this.datasetsList = datasets.objects;
          this.count = datasets.number;
          this.loading = false;
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

export const datasetsDataService = new DatasetsDataService();
