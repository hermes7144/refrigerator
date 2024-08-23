import { useState } from 'react';

export default function useConfirmationDialog(selectedItems, setSelectedItems, performAction) {
  const [isVisible, setIsVisible] = useState(false);
  const [action, setAction] = useState<string | null>(null);

  const openDialog = (newAction: string) => {
    if (selectedItems.length === 0) return;

    setAction(newAction);
    setIsVisible(true);
  };

  const closeDialog = () => {
    setIsVisible(false);
    setAction(null);
  };

  const submitAction = async () => {
    if (!action) return;

    performAction.mutate({ action, selectedItems });

    setSelectedItems([]);
    closeDialog();
  };

  return {
    isVisible,
    action,
    openDialog,
    closeDialog,
    submitAction,
  };
}
