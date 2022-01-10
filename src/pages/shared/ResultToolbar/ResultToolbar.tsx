import { observer } from 'mobx-react-lite';
// import { set } from 'mobx';
import React, { FC, createContext, useContext, useCallback } from 'react';

import { RecladaObjectClass } from 'src/api/IRecladaObject';
import { AddDatasourceToDatasetModal } from 'src/pages/FilesPage/FilesTabs/AddDatasourceToDatasetModal/AddDatasourceToDatasetModal';
import { useObjectContext } from 'src/pages/FilesPage/FilesTabs/ObjectPane/ObjectContext';
import { ReactComponent as Filter } from 'src/resources/filter.svg';
import { ReactComponent as Settings } from 'src/resources/settings.svg';
import { ReactComponent as Sort } from 'src/resources/sort.svg';
import { Pagination } from 'src/shared/Pagination/Pagination';
import { DisplayingTypes, RecladaOrder, RecladaFilter } from 'src/stores/Types';
import { classNames } from 'src/utils/classNames';
import { useOpen } from 'src/utils/useOpen';

import { Actions } from './Actions/Actions';
import { DisplayingSettings } from './DisplayingSettings/DisplayingSettings';
import { FilterModal } from './FilterModal/FilterModal';
import { RestoreSettings } from './RestoreSettings/RestoreSettings';
import style from './ResultToolbar.module.scss';
import { RecladaSorting } from './SortSettings/RecladaSorting/RecladaSorting';

type ResultToolbarProps = {
  className?: string;
};

export interface IServiceToolbar {
  objectClass: RecladaObjectClass | undefined;
  displayingType: DisplayingTypes;
  setDisplayingType: (displayingType: DisplayingTypes) => void;
  setOrder: (order: RecladaOrder[] | undefined) => void;
  orders: RecladaOrder[] | undefined;
  enableOrders?: RecladaOrder[];
  filters: RecladaFilter[] | undefined;
  setFilters: (filter: RecladaFilter[] | undefined) => void;
  selectedRows?: string[];
  enableFilters?: RecladaFilter[];
  currentPage: number;
  count: number;
  pageSize: number;
}

const defaultStateToolbar: IServiceToolbar = {
  objectClass: undefined,
  displayingType: DisplayingTypes.TABLE,
  setDisplayingType: (displayingType: DisplayingTypes) => {},
  setOrder: (order: RecladaOrder[] | undefined) => {},
  orders: [],
  filters: undefined,
  setFilters: (value: RecladaFilter[] | undefined) => {},
  currentPage: 0,
  count: 25,
  pageSize: 25,
};

export const ToolbarContext = createContext(defaultStateToolbar);

export const ResultToolbar: FC<ResultToolbarProps> = observer(({ className }) => {
  const addDatasourceToDatasetModal = useOpen();
  const sortingModal = useOpen();
  const filterModal = useOpen();

  const store = useContext(ToolbarContext);
  const { scrollToPage } = useObjectContext();

  const selectedDataSources = store.selectedRows ?? [];

  // const menu = store.selectedRows ? (
  //   <Menu>
  //     <Menu.Item
  //       key={0}
  //       onClick={store.selectedRows.length ? addDatasourceToDatasetModal.open : () => {}}
  //     >
  //       Add to dataset
  //     </Menu.Item>
  //   </Menu>
  // ) : (
  //   <Menu key={0}></Menu>
  // );

  const handleChangePage = useCallback((page: number) => scrollToPage(page - 1), [
    scrollToPage,
  ]);

  return (
    <>
      <div className={classNames(className, style.root)}>
        {/* <Dropdown overlay={menu}>
          <div className={style.actions}>
            Action <DownOutlined />
          </div>
        </Dropdown> */}
        <Actions />
        <Separator />
        <RestoreSettings />
        <Separator />
        <Pagination
          page={store.currentPage + 1}
          pageSize={store.pageSize}
          total={store.count}
          onChange={handleChangePage}
        />
        <Separator />
        {/* <SortSettings /> */}
        {/* <Separator /> */}
        <DisplayingSettings />
        <Separator />
        <div className={style.sectionContainer}>
          <button
            className={style.iconButton}
            onClick={() => {
              if (store.enableOrders) {
                sortingModal.open();
              }
            }}
          >
            <Sort />
          </button>
          <button
            className={style.iconButton}
            onClick={() => {
              //console.log('click', store.enableFilter);

              if (store.enableFilters) {
                filterModal.open();
              }
            }}
          >
            <Filter />
          </button>
          <button className={style.iconButton}>
            <Settings />
          </button>
        </div>
      </div>

      {addDatasourceToDatasetModal.isOpen && (
        <AddDatasourceToDatasetModal
          isOpen={addDatasourceToDatasetModal.isOpen}
          selectedDataSources={selectedDataSources}
          onClose={addDatasourceToDatasetModal.close}
        />
      )}

      {sortingModal.isOpen && (
        <RecladaSorting
          enableOrders={store.enableOrders}
          orders={store.orders}
          setOrder={store.setOrder.bind(store)}
          onClose={sortingModal.close}
        />
      )}

      {filterModal.isOpen && (
        <FilterModal
          enableFilters={store.enableFilters}
          filters={store.filters}
          setFilters={store.setFilters.bind(store)}
          onClose={filterModal.close}
        />
      )}
    </>
  );
});

function Separator() {
  return <div className={style.separator} />;
}
