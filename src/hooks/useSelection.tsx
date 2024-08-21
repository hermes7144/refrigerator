import { useState } from 'react';

export default function useSelection(initialItems = []) {
  const [selectedItems, setSelectedItems] = useState(initialItems);

  const toggleSelection = (item) => {
    const isAlreadySelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);

    const updatedSelection = isAlreadySelected ? selectedItems.filter((selectedItem) => selectedItem.id !== item.id) : [...selectedItems, item];

    setSelectedItems(updatedSelection);
  };

  return {
    selectedItems,
    toggleSelection,
    setSelectedItems, // 외부에서 직접 설정할 수 있도록 반환
  };
}
