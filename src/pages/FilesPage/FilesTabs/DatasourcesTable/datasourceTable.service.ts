import { action, computed, makeObservable, observable } from 'mobx';

import { IDatasource } from 'src/api/datasourcesService';

class DatasourceTableService {
  private selectedRowKeys = observable.set<string>();

  @computed
  get selectedRows(): string[] {
    return Array.from(this.selectedRowKeys.values());
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
}

export const datasourceTableService = new DatasourceTableService();
