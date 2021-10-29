import { observable, action, makeObservable, computed } from 'mobx';
import { render } from 'react-dom';

export type AttributeData = {
  type: string;
  caption: string;
  width: number;
  maxWidth: number;
};

type AttributesObject = {
  [key: string]: AttributeData;
};
type ObjectStructConfig = {
  name: string;
  attributes: AttributesObject;
  columnsOrder: string[];
};

export class GridStore {
  //@observable private _schemaConfig: ObjectStructConfig;
  @observable private _attributes: AttributesObject;
  @observable private _columns: string[];
  @observable private _selectColumn: number | undefined;
  @observable private _selectRow: number | undefined;
  @observable private _selectRow2: number | undefined;
  @observable private _customWidthColumn = observable.set<number>(undefined);

  private _updateRow: (index: number, index2: number) => void;

  constructor(
    schemaConfig: ObjectStructConfig,
    updareRow: (index: number, delta: number) => void
  ) {
    makeObservable(this);
    for (let key in schemaConfig.attributes) {
      if (!schemaConfig.attributes[key].width) {
        schemaConfig.attributes[key].width = 250;
      }
    }
    //this._schemaConfig = schemaConfig;
    this._attributes = schemaConfig.attributes;
    this._columns = schemaConfig.columnsOrder;
    this._updateRow = updareRow;
  }

  get coolumnOrder(): string[] {
    return this._columns;
  }

  get selectColumn(): number | undefined {
    return this._selectColumn;
  }

  get rowDragging(): number | undefined {
    return this._selectRow;
  }

  isColumnCustomWidth(index: number): boolean {
    return this._customWidthColumn.has(index);
  }

  @computed
  get withTable(): number {
    let result = 0;

    this._columns.forEach((el, i) => {
      const attr = this.getAttributeDataByIndex(i);

      result += this._customWidthColumn.has(i) ? attr.maxWidth : attr.width;
    });

    return result;
  }

  getAttributeDataByIndex(index: number): AttributeData {
    if (index < 0) {
      return { caption: '', type: '', width: 0, maxWidth: 0 };
    }
    const key = this._columns[index];

    return this._attributes[key];
  }

  getOffsetColumn(index: number): number {
    let result = 0;

    for (let i = 0; i < index; i++) {
      result += this._attributes[this._columns[index]].width;
    }

    return result;
  }

  getKeyByIndex(index: number): string {
    return this._columns[index];
  }

  getIndexColumnByOffset(currentIndex: number, offset: number): number {
    if (offset === 0) {
      return currentIndex;
    }

    if (offset > 0) {
      let tempOffset = offset;
      let i = 0;

      while (offset > 0 && currentIndex + i < this._columns.length) {
        i++;
        tempOffset = tempOffset - this._attributes[this._columns[currentIndex + 1]].width;
      }
    }

    return 0;
  }

  @action
  setColumnOrder(index: number, offset: number) {
    const delta = Math.round(offset / 250);

    if (!delta) {
      return;
    }

    const newHeaders = [...this._columns];
    const temp = newHeaders[index];

    newHeaders[index] = newHeaders[index + delta];
    newHeaders[index + delta] = temp;
    this._columns = newHeaders;
  }

  setRowForSwap(index: number | undefined) {
    console.log('row for swap');
    this._selectRow2 = index;
  }

  setRowOrder(index: number) {
    //const delta = Math.round(offset / 55);
    setTimeout(() => {
      if (this._selectRow2 !== undefined) {
        this._updateRow(index, this._selectRow2);
        this._selectRow2 = undefined;
        this._selectRow = undefined;
      }
    }, 100);
    // if (!delta) {
    //   return;
    // }
  }

  @action
  setColumnSelect(index: number | undefined) {
    this._selectColumn = index;
  }

  @action
  setRowDragging(index: number | undefined) {
    this._selectRow = index;
  }

  @action
  setColumnWidth(index: number, offset: number) {
    const key = this._columns[index];

    const newAttrs = { ...this._attributes };

    if (!this._customWidthColumn.has(index)) {
      newAttrs[key].width += offset;
    } else {
      newAttrs[key].width = newAttrs[key].maxWidth + offset;
    }
    this._attributes = newAttrs;
    this._customWidthColumn.delete(index);
  }

  @action
  setColumnCustomWidth(index: number, remove?: boolean) {
    if (remove) {
      this._customWidthColumn.delete(index);

      return;
    }

    if (!this._customWidthColumn.has(index)) {
      this._customWidthColumn.add(index);
    }
  }
}

export type GridStoreType = GridStore;
