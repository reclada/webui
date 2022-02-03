import { useEffect } from 'react';

import { eventEmitter } from './EventEmitter';

/**
 * Hook for subscription to grid events
 *
 * @param event name of event
 * @param handler event handler
 */
export const useSubscription = (event: string, handler: Function) => {
  useEffect(() => {
    eventEmitter.on(event, handler);

    return () => eventEmitter.off(event, handler);
  }, [event, handler]);
};
