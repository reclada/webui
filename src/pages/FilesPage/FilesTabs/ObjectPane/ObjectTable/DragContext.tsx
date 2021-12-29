import React, { useContext } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';

interface IDragContext {
  onStop: (event: DraggableEvent, data: DraggableData) => void;
  onStart: (event: DraggableEvent, data: DraggableData) => void;
  onScrollTable: (event: any) => void;
}

const defaultValue = {
  onStop: () => undefined,
  onStart: () => undefined,
  onScrollTable: () => undefined,
};

export const DragContext = React.createContext<IDragContext>(defaultValue);

export const useDragContext = () => useContext(DragContext);
