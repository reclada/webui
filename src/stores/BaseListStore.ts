import { observable, action, makeObservable, ObservableMap, runInAction } from 'mobx';
import { computedFn } from 'mobx-utils';

import { IIdentifiable } from './Types';

interface IResult<TListItem> {
  number: number;
  objects: TListItem[];
}

export default class BaseListStore<TListItem extends IIdentifiable> {
  @observable.shallow protected _results: ObservableMap<
    number,
    TListItem
  > = observable.map<number, TListItem>(undefined, { deep: false });
  @observable protected _count: number = 0;
  @observable protected _currentPage: number = 0;
  @observable protected _isError: boolean = false;
  @observable protected _isLoading: boolean = false;

  protected rowInPage: number;
  protected pageLoding: Set<number> = new Set<number>();
  protected cache: Map<number, number> = new Map<number, number>();

  protected fetchData: (offset: number, limit: number) => Promise<IResult<TListItem>>;

  constructor(
    rowInPage: number,
    fetchData: (offset: number, limit: number) => Promise<IResult<TListItem>>
  ) {
    makeObservable<BaseListStore<TListItem>>(this);
    this.fetchData = fetchData;
    this.rowInPage = rowInPage;
  }

  get count(): number {
    return this._count;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get isError(): boolean {
    return this._isError;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  @action
  setCount(value: number) {
    this._count = value;
  }

  @action
  setError(value: boolean) {
    this._isError = value;
  }

  @action
  setLoading(value: boolean) {
    this._isLoading = value;
  }

  @action
  addToList(list: TListItem[], offset: number) {
    list.forEach((el, index) => {
      this._results.set(index + offset, el);
    });
  }

  initList() {
    this.setLoading(true);
    this.fetchData(0, this.rowInPage)
      .then(result => {
        this.addToList(result.objects, 0);
        this.setCount(result.number);
        this.setLoading(false);
      })
      .catch(err => {
        runInAction(() => {
          this._isError = true;
          this._isLoading = false;
        });
      });
  }

  @action
  deleteElem(index: number) {
    this._results.delete(index);
    this._count = this._count - 1;
  }

  @action
  updateRow(index: number, elem: TListItem) {
    this._results.set(index, elem);
  }

  @action
  clear() {
    this._results.clear();
  }

  @action
  setCurrentPage(val: number) {
    this._currentPage = val;
    this.cache.set(val, new Date().getTime());
  }

  updateList(index: number) {
    const page = Math.floor(index / this.rowInPage);

    this.setCurrentPage(page);

    if (!this.pageLoding.has(page) && !this._results.has(index)) {
      this.pageLoding.add(page);
      this.fetchData(page * this.rowInPage, this.rowInPage)
        .then(result => {
          this.pageLoding.delete(page);
          this.addToList(result.objects, page * this.rowInPage);
          this.cacheCleaning();
        })
        .catch(err => {});
    }
  }

  getRow = computedFn((index: number): TListItem | undefined => {
    return this._results.get(index);
  });

  private cacheCleaning() {
    const time = new Date().getTime();
    const afd: number[] = [];

    this.cache.forEach((el, index) => {
      if (
        el &&
        el < time - 100000 &&
        index !== this._currentPage &&
        index !== this._currentPage + 1 &&
        index !== this._currentPage - 1
      ) {
        afd.push(index);
      }
    });

    afd.forEach(el => {
      for (var i = 0; i < this.rowInPage; i++) {
        this._results.delete(el * this.rowInPage + i);
      }
      this.cache.delete(el);
    });
  }
}

export type BaseListStoreType = BaseListStore<IIdentifiable>;
