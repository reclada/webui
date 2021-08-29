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

  getRowByIndex(index: number): IDataset | undefined {
    return this.datasetsList && index < this.datasetsList.length
      ? this.datasetsList[index]
      : undefined;
  }

  async setOffset(value: number): Promise<void> {
    const resp = await fetchDatasets(this.orderList ? this.orderList : [], 1000, value);

    this.offset = value;
    this.datasetsList = resp.objects;
    this.count = resp.number;
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

  prepareNewData(index: number, forward: boolean): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (index > this.offset + 800 || index < this.offset) {
        if (this.timerId) {
          this.clearTimer();
        }

        this.timerId = window.setTimeout(async () => {
          await this.setOffset(index - 200 < 0 ? 0 : index - 200);
          resolve(false);
        }, 1000);
      }
    });
  }

  checkData(index: number): boolean {
    return index > this.offset + 800 || index < this.offset;
  }

  clearTimer() {
    clearTimeout(this.timerId);
    this.timerId = undefined;
  }
}

export const datasetsDataService = new DatasetsDataService();
