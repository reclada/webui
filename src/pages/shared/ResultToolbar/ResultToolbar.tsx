import { observer } from 'mobx-react-lite';
// import { set } from 'mobx';
import React, { createContext, useContext, ReactElement, useMemo } from 'react';

import { RecladaObjectClass } from 'src/api/IRecladaObject';
import { GridLayout } from 'src/grid/GridLayout';
import { AddDatasourceToDatasetModal } from 'src/pages/FilesPage/FilesTabs/AddDatasourceToDatasetModal/AddDatasourceToDatasetModal';
import { EditDataSetModal } from 'src/pages/FilesPage/FilesTabs/DatasetsPane/shared/Modals/EditDataSetModal';
import { useObjectContext } from 'src/pages/FilesPage/FilesTabs/ObjectPane/ObjectContext';
import { UploadDatasourceModal } from 'src/pages/FilesPage/FilesTabs/UploadDatasourceModal/UploadDatasourceModal';
import { ReactComponent as Filter } from 'src/resources/filter.svg';
import { ReactComponent as Settings } from 'src/resources/settings.svg';
import { ReactComponent as Sort } from 'src/resources/sort.svg';
import { Pagination } from 'src/shared/Pagination/Pagination';
import { DisplayingTypes, RecladaOrder, RecladaFilter } from 'src/stores/Types';
import { BasicGridItem } from 'src/types/GridLayout';
import { classNames } from 'src/utils/classNames';
import { eventEmitter } from 'src/utils/EventEmitter';
import { useOpen } from 'src/utils/useOpen';
import { useSubscription } from 'src/utils/useSubscription';

import { Actions } from './Actions/Actions';
import { DisplayingSettings } from './DisplayingSettings/DisplayingSettings';
import { FilterModal } from './FilterModal/FilterModal';
import { RestoreSettings } from './RestoreSettings/RestoreSettings';
import style from './ResultToolbar.module.scss';
import { RecladaSorting } from './SortSettings/RecladaSorting/RecladaSorting';

type ResultToolbarProps = {
  className?: string;
  children?: BasicGridItem | BasicGridItem[];
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

export const ResultToolbar = observer(
  ({ className, children = [] }: ResultToolbarProps): ReactElement => {
    const addDatasourceToDatasetModal = useOpen();
    const {
      isOpen: isOpenedAddModal,
      open: openAddModal,
      close: closeAddModal,
    } = useOpen();

    const store = useContext(ToolbarContext);

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

    useSubscription('OPEN_ADD_MODAL', openAddModal);

    const content = useMemo(() => {
      if (typeof children === 'string') {
        return children;
      }

      if (Array.isArray(children)) {
        return children.map((child, index) => {
          return (
            <>
              {typeof child === 'string' ? (
                child
              ) : (
                <GridLayout key={index} layout={child} />
              )}
              {index !== children.length - 1 && <Separator />}
            </>
          );
        });
      }

      return <GridLayout layout={children} />;
    }, [children]);

    return (
      <>
        <div className={classNames(className, style.root)}>
          {content}

          {/* <Dropdown overlay={menu}>
          <div className={style.actions}>
            Action <DownOutlined />
          </div>
        </Dropdown> */}
          {/* <Actions />
          <Separator />
          <RestoreSettings />
          <Separator /> */}
          {/* <Pagination /> */}
          {/* <Separator /> */}
          {/* <SortSettings /> */}
          {/* <Separator /> */}
          {/* <DisplayingSettings />
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
          </div> */}
        </div>

        {store.objectClass === RecladaObjectClass.DataSet ? (
          <EditDataSetModal
            handleCancel={closeAddModal}
            handleOk={closeAddModal}
            isCreationType
            opened={isOpenedAddModal}
          />
        ) : (
          <UploadDatasourceModal isOpen={isOpenedAddModal} onClose={closeAddModal} />
        )}

        {addDatasourceToDatasetModal.isOpen && (
          <AddDatasourceToDatasetModal
            isOpen={addDatasourceToDatasetModal.isOpen}
            selectedDataSources={selectedDataSources}
            onClose={addDatasourceToDatasetModal.close}
          />
        )}

        <RecladaSorting
          enableOrders={store.enableOrders}
          orders={store.orders}
          setOrder={store.setOrder.bind(store)}
        />

        <FilterModal
          enableFilters={store.enableFilters}
          filters={store.filters}
          setFilters={store.setFilters.bind(store)}
        />
      </>
    );
  }
);

function Separator() {
  return <div className={style.separator} />;
}
