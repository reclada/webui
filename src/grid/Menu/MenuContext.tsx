import React, { memo, PropsWithChildren, useContext, useMemo } from 'react';

interface IMenuContext {
  selectedValues?: (string | number)[];
  onSelect?: (value: string | number) => void;
}

const defaultValue: IMenuContext = {
  selectedValues: [],
};

const MenuContext = React.createContext<IMenuContext>(defaultValue);

export const MenuProvider = memo<PropsWithChildren<IMenuContext>>(
  ({ selectedValues, onSelect, children }) => {
    const value = useMemo<IMenuContext>(
      () => ({
        selectedValues,
        onSelect,
      }),
      [onSelect, selectedValues]
    );

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
  }
);

export const useMenuContext = () => useContext(MenuContext);
