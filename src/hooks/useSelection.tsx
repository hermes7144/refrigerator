import { useState } from 'react';
type WithId = { id?: string | number }; // id 속성을 가진 타입 정의

export default function useSelection<T extends WithId>(initialItems = []) {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialItems);

  const toggleSelection = (item: T) => {
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
