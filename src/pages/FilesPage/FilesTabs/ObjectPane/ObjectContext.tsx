import React, { ReactElement, ReactNode, useContext, useMemo } from 'react';

import { ObjectDataService } from './objectdata.service';

interface ObjectContextTypes {
  service: ObjectDataService;
  selectable: boolean;
}

const ObjectContext = React.createContext<ObjectContextTypes>({
  selectable: false,
} as ObjectContextTypes);

interface Props {
  children: ReactNode;
  service: ObjectDataService;
  selectable: boolean;
}

export const ObjectContextProvider = ({
  children,
  service,
  selectable,
}: Props): ReactElement => {
  const value = useMemo(
    () => ({
      service,
      selectable,
    }),
    [selectable, service]
  );

  return <ObjectContext.Provider value={value}>{children}</ObjectContext.Provider>;
};

export const useObjectContext = () => useContext(ObjectContext);
