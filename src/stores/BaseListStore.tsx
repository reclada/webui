import { clear } from 'console';

import { Result } from 'antd';
import { observable, action, makeObservable } from 'mobx';
import { computedFn } from 'mobx-utils';

import { IIdentifiable } from './Types';

interface IResult<TListItem> {
  number: number;
  objects: TListItem[];
}

export default class BaseListStore<TListItem extends IIdentifiable> {
  @observable protected _results: Map<number, TListItem> = new Map<number, TListItem>();
  @observable protected _count: number = 0;
  protected rowInPage: number;
  protected pageLoding: Set<number> = new Set<number>();
  protected casher: Map<number, number> = new Map<number, number>();
  protected timer: number = 0;
  @observable protected _currentPage: number = 0;

  protected fetchData: (index: number) => Promise<IResult<TListItem>>;

  constructor(
    rowInPage: number,
    fetchData: (index: number) => Promise<IResult<TListItem>>
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

  @action
  setCount(value: number) {
    this._count = value;
  }

  @action
  addToList(list: TListItem[], offset: number) {
    list.forEach((el, index) => {
      this._results.set(index + offset, el);
    });
  }

  initList() {
    this.fetchData(0).then(result => {
      this.addToList(result.objects, 0);
      this.setCount(result.number);
    });

    this.timer = window.setInterval(() => {
      this.cashProcess();
    }, 100000);
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
    this._results = new Map<number, TListItem>();
  }

  @action
  setCurrentPage(val: number) {
    this._currentPage = val;
  }

  getRow = computedFn((index: number): TListItem | undefined => {
    const page = Math.floor(index / this.rowInPage);

    this.casher.set(page, new Date().getTime());
    this.setCurrentPage(page);

    if (this._results.has(index)) {
      return this._results.get(index);
    }

    if (!this.pageLoding.has(page)) {
      //this.isLoading = true;
      this.pageLoding.add(page);
      window.setTimeout(() => {
        this.fetchData(page * this.rowInPage).then(result => {
          this.pageLoding.delete(page);
          this.addToList(result.objects, page * 1000);
        });
      }, 1000);
    }

    return undefined;
  });

  cashProcess() {
    console.log(this.casher);
    const time = new Date().getTime();
    const afd: number[] = [];

    this.casher.forEach((el, index) => {
      if (el && el < time - 100000 && this._currentPage !== index) {
        afd.push(index);
      }
    });

    afd.forEach(el => {
      console.log(el);
      for (var i = 0; i < 1000; i++) {
        this._results.delete(el * this.rowInPage + i);
      }
      this.casher.delete(el);
    });
  }
}

export type BaseListStoreType = BaseListStore<IIdentifiable>;
