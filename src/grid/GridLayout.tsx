import get from 'lodash.get';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';

import { useAppState } from 'src/context/RootState';
import { BaseComponentsMap } from 'src/grid/components-map';
import { BasicGridItem } from 'src/types/GridLayout';
import { eventEmitter } from 'src/utils/EventEmitter';

interface Props {
  layout: BasicGridItem;
}

export const GridLayout = observer(({ layout }: Props) => {
  const { component, props, children, event } = layout;

  const Component =
    BaseComponentsMap[component as keyof typeof BaseComponentsMap] ||
    BaseComponentsMap['Fallback'];

  const { appState } = useAppState();

  const value = props?.value
    ? /^{.+}$/g.test(props.value)
      ? get(appState, props.value.replace(/{|}/g, ''))
      : props.value
    : undefined;

  const fireEvent = useCallback(
    value => {
      event && eventEmitter.emit(event.name, event.value || value);
    },
    [event]
  );

  const events = {
    ...(event?.type === 'click' ? { onClick: fireEvent } : {}),
    ...(event?.type === 'change' ? { onChange: fireEvent } : {}),
  };

  return <Component {...props} children={children} value={value} {...events} />;
});

GridLayout.displayName = 'GridLayout';
