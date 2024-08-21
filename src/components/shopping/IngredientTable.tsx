import { useEffect, useMemo, useState } from 'react';
import { IngredientProps, IngredientTableProps } from '../../types/ingredientTypes';
import SkeletonIngredientTable from '../ingredient/SkeletonIngredientTable';
import CommonItem from './CommonItem';

export default function IngredientTable({ query, isStale, items, selectedItems, toggleSelection }: IngredientTableProps) {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (items) setIsInitialLoad(false);
  }, [items]);

  const filteredIngredients = useMemo(() => {
    if (!items) return [];

    const lowerQuery = query.toLowerCase();

    return items.filter((item) => item.name.toLowerCase().includes(lowerQuery));
  }, [items, query]);

  const nonZeroQtyItems = useMemo(() => filteredIngredients.filter((item) => item.qty !== 0), [filteredIngredients]);
  const zeroQtyItems = useMemo(() => filteredIngredients.filter((item) => item.qty === 0), [filteredIngredients]);

  if (isInitialLoad) return <SkeletonIngredientTable />;

  return (
    <div className='flex justify-center'>
      <table className='table-auto w-full'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-center w-1/2'>쇼핑 목록</th>
            <th className='px-4 py-2 text-center w-1/5'>수량</th>
            <th className='hidden md:table-cell px-4 py-2 text-center w-1/5'>유통기한</th>
            <th className='w-1/10'></th>
          </tr>
        </thead>
        <tbody className={isStale ? 'text-gray-400' : ''}>
          {[...nonZeroQtyItems, ...zeroQtyItems].map((item: IngredientProps) => (
            <CommonItem key={item.id} item={item} isSelected={selectedItems.some((selectedItem) => selectedItem.id === item.id)} onSelect={() => toggleSelection(item)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
