import { DownOutlined } from '@ant-design/icons/lib';
import { Dropdown, Menu } from 'antd';
import { observer } from 'mobx-react-lite';
// import { set } from 'mobx';
import React, { FC, createContext, useContext } from 'react';

import { AddDatasourceToDatasetModal } from 'src/pages/FilesPage/FilesTabs/AddDatasourceToDatasetModal/AddDatasourceToDatasetModal';
import { ReactComponent as Filter } from 'src/resources/filter.svg';
import { ReactComponent as Settings } from 'src/resources/settings.svg';
import { ReactComponent as Sort } from 'src/resources/sort.svg';
import { Paginator } from 'src/shared/Paginator/Paginator';
import { DisplayingTypes, RecladaOrder } from 'src/shared/Sorting/Sorting';
import { classNames } from 'src/utils/classNames';
import { useOpen } from 'src/utils/useOpen';

import { DisplayingSettings } from './DisplayingSettings/DisplayingSettings';
import style from './ResultToolbar.module.scss';
import { RecladaSorting } from './SortSettings/SortModal/RecladaSorting';
import { SortSettings } from './SortSettings/SortSettings';

type ResultToolbarProps = {
  className?: string;
};

export interface IServiceToolbar {
  displaingType: DisplayingTypes;
  setDisplaingType: (displaingType: DisplayingTypes) => void;
  setOrder: (order: RecladaOrder[] | undefined) => void;
  orders: RecladaOrder[] | undefined;
  selectedRows?: string[];
  enableOrders?: RecladaOrder[];
}

const defaultStateToolbar: IServiceToolbar = {
  displaingType: DisplayingTypes.TABLE,
  setDisplaingType: (displaingType: DisplayingTypes) => {},
  setOrder: (order: RecladaOrder[] | undefined) => {},
  orders: [],
};

export const ToolbarContext = createContext(defaultStateToolbar);

export const ResultToolbar: FC<ResultToolbarProps> = observer(function ResultToolbar({
  className,
}) {
  const addDatasourceToDatasetModal = useOpen();

  const sortingModal = useOpen();

  const store = useContext(ToolbarContext);

  const selectedDataSources = store.selectedRows !== undefined ? store.selectedRows : [];

  const menu =
    store.selectedRows !== undefined ? (
      <Menu>
        <Menu.Item
          onClick={
            store.selectedRows.length ? addDatasourceToDatasetModal.open : () => {}
          }
        >
          Add to dataset
        </Menu.Item>
      </Menu>
    ) : (
      <Menu></Menu>
    );

  return (
    <>
      <div className={classNames(className, style.root)}>
        <Dropdown overlay={menu}>
          <div className={style.actions}>
            Action <DownOutlined />
          </div>
        </Dropdown>
        <Separator />
        <Paginator />
        <Separator />
        <SortSettings />
        <Separator />
        <DisplayingSettings />
        <Separator />
        <div style={{ display: 'flex' }}>
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
          <button className={style.iconButton}>
            <Filter />
          </button>
          <button className={style.iconButton}>
            <Settings />
          </button>
        </div>
      </div>
      {addDatasourceToDatasetModal.isOpen ? (
        <AddDatasourceToDatasetModal
          isOpen={addDatasourceToDatasetModal.isOpen}
          selectedDataSources={selectedDataSources}
          onClose={addDatasourceToDatasetModal.close}
        />
      ) : null}

      {sortingModal.isOpen ? <RecladaSorting onClose={sortingModal.close} /> : null}
    </>
  );
});

function Separator() {
  return <div className={style.separator} />;
}
