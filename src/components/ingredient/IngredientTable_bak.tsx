import React, { useEffect, useState, memo, useMemo } from 'react';
import useIngredients from '../../hooks/useIngredients';
import { IngredientTableProps } from '../../types/ingredientTypes';
import IngredientItem from './IngredientItem_bak';
import SkeletonIngredientTable from './SkeletonIngredientTable';

function IngredientTable({ query, isStale }: IngredientTableProps) {
  const {
    ingredientsQuery: { data: initIngredients },
  } = useIngredients();

  const [isInitialLoad, setIsInitialLoad] = useState(true);

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
    <>
      <div className='flex justify-center'>
        <table className='table-auto w-full'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='px-4 py-2 w-1/2 text-center'>Ingredient</th>
              <th className='px-4 py-2 w-1/6 text-center'>Qty</th>
              <th className='px-4 py-2 w-2/6 text-center'>Expiration</th>
              <th className='px-4 py-2 w-1/6'></th>
            </tr>
          </thead>
          <tbody className={isStale ? 'text-gray-400' : ''}>
            {nonZeroQtyItems?.map((ingredient) => (
              <IngredientItem key={ingredient.id} ingredient={ingredient} />
            ))}
            {zeroQtyItems?.map((ingredient) => (
              <IngredientItem key={ingredient.id} ingredient={ingredient} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default memo(IngredientTable);
