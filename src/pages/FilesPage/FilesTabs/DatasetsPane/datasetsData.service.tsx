import { action, makeObservable, observable, runInAction } from 'mobx';
import { computedFn } from 'mobx-utils';

import { fetchDatasets, IDataset } from 'src/api/datasetsDataGateService';
import { DisplayingTypes } from 'src/Sorting';
import { OrderBy } from 'src/Sorting';

class DatasetsDataService {
  @observable private dispType: DisplayingTypes = DisplayingTypes.TABLE;
  @observable private aRecord: IDataset | undefined;
  @observable private loading: boolean = false;
  @observable private error: boolean = false;
  private errMsg: string = '';
  @observable private offset: number = 0;
  private timerId: number | undefined;

  @observable private orderList: OrderBy[] | undefined;
  private datasetsList: IDataset[] | undefined;
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

  getRowByIndex = computedFn((index: number): IDataset | undefined => {
    if (
      this.datasetsList &&
      index >= this.offset &&
      index - this.offset < this.datasetsList.length
    ) {
      return this.datasetsList[index - this.offset];
    }

    if (this.timerId) {
      this.clearTimer();
    }

    this.timerId = window.setTimeout(() => {
      this.setOffset(index - 200 < 0 ? 0 : index - 200);
    }, 1000);

    return undefined;
  });

  setOffset(value: number): any {
    fetchDatasets(this.orderList ? this.orderList : [], 1000, value).then(resp => {
      runInAction(() => {
        this.offset = value;
      });

      this.datasetsList = resp.objects;
      this.count = resp.number;
    });
  }

  updateDatasets() {
    runInAction(() => {
      this.loading = true;
    });
    this.offset = 0;
    fetchDatasets(this.orderList ? this.orderList : [], 1000, this.offset)
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

  clearTimer() {
    clearTimeout(this.timerId);
    this.timerId = undefined;
  }
}

export const datasetsDataService = new DatasetsDataService();
