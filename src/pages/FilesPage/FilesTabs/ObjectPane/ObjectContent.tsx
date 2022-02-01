import React, { ReactElement, useEffect } from 'react';

import { RecladaObjectClass } from 'src/api/IRecladaObject';
import { useAppState } from 'src/context/RootState';
import { BasicGridItem } from 'src/types/GridLayout';

import { ObjectDataService } from './objectdata.service';
import { ObjectPane } from './ObjectPane';

interface Props {
  objectClass: RecladaObjectClass;
  selectable?: boolean;
  children: BasicGridItem | BasicGridItem[];
}

export const ObjectContent = ({
  objectClass,
  selectable,
  children,
}: Props): ReactElement | null => {
  const { appState, setAppState } = useAppState();

  const service = appState.object[objectClass];

  useEffect(() => {
    if (!service) {
      const objectService = new ObjectDataService(objectClass);

      setAppState(prevState => ({
        ...prevState,
        object: { ...prevState.object, [objectClass]: objectService },
      }));
    }
  }, [objectClass, service, setAppState]);

  if (!service) {
    return null;
  }

  return (
    <ObjectPane layout={children} selectable={selectable} service={service}></ObjectPane>
  );
};
