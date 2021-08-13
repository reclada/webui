import { DownOutlined } from '@ant-design/icons/lib';
import { Dropdown, Menu, Tooltip } from 'antd';
// import { set } from 'mobx';
import React, { FC, createContext } from 'react';

import { AddDatasourceToDatasetModal } from 'src/pages/FilesPage/FilesTabs/AddDatasourceToDatasetModal/AddDatasourceToDatasetModal';
import { datasourceTableService } from 'src/pages/FilesPage/FilesTabs/DatasourcesTable/datasourceTable.service';
import { useOpen } from 'src/utils/useOpen';

import { ReactComponent as Settings } from '../../../../resources/settings.svg';
import { Paginator } from '../../../../shared/Paginator/Paginator';
import { classNames } from '../../../../utils/classNames';

import { DisplayingSettings } from './DisplayingSettings/DisplayingSettings';
import style from './ResultToolbar.module.scss';
import { SortSettings } from './SortSettings/SortSettings';

type ResultToolbarProps = {
  className?: string;
};

export enum DisplayingTypes {
  LIST = 'list',
  CARD = 'card',
  TABLE = 'table',
}
export interface IServiceToolbar {
  DisplaingType: DisplayingTypes;
  setDisplaingType(displaingType: DisplayingTypes): void;
}

const defaultStateToolbar: IServiceToolbar = {
  DisplaingType: DisplayingTypes.TABLE,
  setDisplaingType: (displaingType: DisplayingTypes) => {},
};

export const ToolbarContext = createContext(defaultStateToolbar);

export const ResultToolbar: FC<ResultToolbarProps> = function ResultToolbar({
  className,
}) {
  const addDatasourceToDatasetModal = useOpen();

  const selectedDataSources = datasourceTableService.selectedRows;

  const menu = (
    <Menu>
      <Menu.Item
        onClick={
          datasourceTableService.selectedRows.length
            ? addDatasourceToDatasetModal.open
            : () => {}
        }
      >
        Add to dataset
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className={classNames(className, style.root)}>
        {/* <Tooltip color={'#243B50'} placement="bottom" title="List of actions">
        <div className={style.actions}>
          Action <DownOutlined />
        </div>
      </Tooltip> */}
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
        <button className={style.iconButton}>
          <Settings />
        </button>
      </div>

      <AddDatasourceToDatasetModal
        isOpen={addDatasourceToDatasetModal.isOpen}
        selectedDataSources={selectedDataSources}
        onClose={addDatasourceToDatasetModal.close}
      />
    </>
  );
};

function Separator() {
  return <div className={style.separator} />;
}
