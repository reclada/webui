import { useCallback, useState } from 'react';

interface UseOpenResult {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
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
    onOpen: handleOpen,
    onClose: handleClose,
  };
}
