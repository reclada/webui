import { RefObject, useCallback, useEffect, useState } from 'react';

export function useContainerWidth(containerRef: RefObject<HTMLDivElement>): number {
  const [width, setWidth] = useState(() => containerRef.current?.clientWidth ?? 0);

  const handleUpdateWidth = useCallback(() => {
    setWidth(containerRef.current?.clientWidth ?? 0);
  }, [containerRef]);

  // Check/update width in case container shows/hides the scrollbar
  useEffect(() => {
    handleUpdateWidth();
  });

  useEffect(() => {
    window.addEventListener('resize', handleUpdateWidth);

    return () => {
      window.removeEventListener('resize', handleUpdateWidth);
    };
  }, [containerRef, handleUpdateWidth]);

  return width;
}
