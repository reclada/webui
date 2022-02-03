import { observer } from 'mobx-react-lite';
import React, { Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';

interface IAppState {
  [store: string]: any;
}

interface AppStateContext {
  appState: IAppState;
  setAppState: Dispatch<SetStateAction<IAppState>>;
}

const AppContext = React.createContext<AppStateContext>({
  appState: {},
  setAppState: () => undefined,
});

export const AppStateProvider = observer(({ children }) => {
  const [appState, setAppState] = useState<IAppState>({
    object: {},
  });

  const value = useMemo(() => ({ appState, setAppState }), [appState]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});

export const useAppState = () => useContext(AppContext);
