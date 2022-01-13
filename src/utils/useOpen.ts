import { useCallback, useState } from 'react';

interface UseOpenResult {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useOpen(initialValue = false): UseOpenResult {
  const [isOpen, setIsOpen] = useState(initialValue);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prevValue => !prevValue);
  }, []);

  return {
    isOpen,
    open: handleOpen,
    close: handleClose,
    toggle,
  };
}
