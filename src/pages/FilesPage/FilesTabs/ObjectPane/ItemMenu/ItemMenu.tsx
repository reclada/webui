import { observer } from 'mobx-react-lite';
import React from 'react';

import {
  IRecladaDataset,
  IRecladaObject,
  RecladaObjectClass,
} from 'src/api/IRecladaObject';

import { MoreMenuRenderer as DataSetItemMenu } from '../../DatasetsPane/shared/MoreMenuRenderer/MoreMenuRenderer';
import { MoreMenuRenderer as FileItemMenu } from '../../DatasourcesPane/shared/MoreMenuRenderer/MoreMenuRenderer';
import { useObjectContext } from '../ObjectContext';

interface Props {
  className?: string;
  item: IRecladaObject;
  onUpdate?: (name: string) => void;
}

export const ItemMenu = observer(({ className, item, onUpdate }: Props) => {
  const { service } = useObjectContext();

  const objectClass = service.objectClass;

  if (objectClass === RecladaObjectClass.File) {
    return (
      <FileItemMenu className={className} datasource={item as any} onUpdate={onUpdate} />
    );
  }

  if (objectClass === RecladaObjectClass.DataSet) {
    return (
      <DataSetItemMenu
        className={className}
        dataSet={item as IRecladaDataset}
        onUpdate={onUpdate}
      />
    );
  }

  return null;
});
