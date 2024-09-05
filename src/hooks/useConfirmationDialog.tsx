import { useState } from 'react';

export default function useConfirmationDialog<T>(
  selectedItems: T[],
  setSelectedItems: (items: []) => void,
  performAction: { mutate: (params: { action: string; selectedItems: T[] }) => void }
): {
  isVisible: boolean;
  action: string;
  openDialog: (action: string) => void;
  closeDialog: () => void;
  submitAction: () => Promise<void>;
} {
  const [dialogState, setDialogState] = useState({
    isVisible: false,
    action: '',
  });

  const openDialog = (newAction: string) => {
    if (selectedItems.length === 0 || newAction === '') return;
    setDialogState({ isVisible: true, action: newAction });
  };

  const closeDialog = () => {
    setDialogState({ isVisible: false, action: '' });
  };

  const submitAction = async () => {
    if (!dialogState.action) return;

    await performAction.mutate({ action: dialogState.action, selectedItems });
    setSelectedItems([]);
    closeDialog();
  };

  return {
    ...dialogState,
    openDialog,
    closeDialog,
    submitAction,
  };
}
