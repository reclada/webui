import { useCallback, useState } from 'react';

interface UseOpenResult {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export function useOpen(initialValue: boolean): UseOpenResult {
  const [isOpen, setIsOpen] = useState(initialValue);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    open: handleOpen,
    close: handleClose,
  };
}
