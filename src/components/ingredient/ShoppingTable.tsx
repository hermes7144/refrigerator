import React, { useEffect, useState, useMemo, memo } from 'react';
import useIngredients from '../../hooks/useIngredients';
import SkeletonIngredientTable from './SkeletonIngredientTable';
import useSelection from '../../hooks/useSelection'; // useSelection을 가져옵니다.
import IngredientTable from './IngredientTable';

function ShoppingTable({ query, isStale }: { query: string; isStale: boolean }) {
  const {
    ingredientsQuery: { data: initIngredients },
  } = useIngredients();

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { selectedItems, toggleSelection } = useSelection(); // 선택된 항목을 관리

  useEffect(() => {
    if (initIngredients) setIsInitialLoad(false);
  }, [initIngredients]);

  const filteredIngredients = useMemo(() => {
    if (!initIngredients) return [];

    const lowerQuery = query.toLowerCase();

    return initIngredients.filter((ingredient) => ingredient.name.toLowerCase().includes(lowerQuery));
  }, [initIngredients, query]);

  const nonZeroQtyItems = useMemo(() => filteredIngredients.filter((item) => item.qty !== 0), [filteredIngredients]);
  const zeroQtyItems = useMemo(() => filteredIngredients.filter((item) => item.qty === 0), [filteredIngredients]);

  if (isInitialLoad) return <SkeletonIngredientTable />;

  return (
    <div className='flex justify-center'>
      <IngredientTable
        items={[...nonZeroQtyItems, ...zeroQtyItems]} // 재료 목록을 합쳐서 전달
        selectedItems={selectedItems} // 선택된 항목을 전달
        toggleSelection={toggleSelection} // 항목 선택/해제를 위한 함수 전달
      />
    </div>
  );
}

export default memo(ShoppingTable);
