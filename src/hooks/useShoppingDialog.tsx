import { useState } from 'react';

export default function useShoppingDialog(selectedItems, performAction) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);

  const handleOpenDialog = (action) => {
    if (selectedItems.length === 0) return;

    setDialogAction(action);
    setDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setDialogVisible(false);
    setDialogAction(null);
  };

  const handleSubmit = () => {
    if (!dialogAction) return;

    performAction.mutate({
      action: dialogAction,
      selectedItems,
    });

    handleCloseDialog();
  };

  return {
    dialogVisible,
    dialogAction,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
  };
}
