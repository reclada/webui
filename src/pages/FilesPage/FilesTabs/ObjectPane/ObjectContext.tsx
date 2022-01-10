import { observer } from 'mobx-react-lite';
import React, {
  MutableRefObject,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';

import { ObjectDataService } from './objectdata.service';

interface ObjectContextTypes {
  service: ObjectDataService;
  selectable: boolean;
  scrollToRef: MutableRefObject<((offset: number) => void) | null>;
  scrollToPage: (page: number) => void;
}

const ObjectContext = React.createContext<ObjectContextTypes>({
  selectable: false,
} as ObjectContextTypes);

interface Props {
  children: ReactNode;
  service: ObjectDataService;
  selectable: boolean;
}

export const ObjectContextProvider = observer(
  ({ children, service, selectable }: Props): ReactElement => {
    const scrollToRef = useRef<(offset: number) => void>(null);

    const scrollToPage = useCallback(
      (page: number) => {
        const count = page * service.pageSize;
        const y = Math.max(count * 65, 0);

        scrollToRef.current?.(y);
      },
      [service.pageSize]
    );

    const value = useMemo(
      () => ({
        service,
        selectable,
        scrollToRef,
        scrollToPage,
      }),
      [selectable, service, scrollToPage]
    );

    return <ObjectContext.Provider value={value}>{children}</ObjectContext.Provider>;
  }
);

export const useObjectContext = () => useContext(ObjectContext);
