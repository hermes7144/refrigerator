import React, { useEffect, useState, useTransition } from 'react';
import useIngredients from '../../hooks/useIngredients';
import { IngredientProps, IngredientTableProps } from '../../types/ingredientTypes';
import IngredientItem from './IngredientItem';
import SkeletonIngredientTable from './SkeletonIngredientTable';

export default function IngredientTable({ query, onEdit, onDelete }: IngredientTableProps) {
  const { ingredientsQuery: { data: initIngredients } } = useIngredients();
  const [filteredIngredients, setFilteredIngredients] = useState<IngredientProps[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    startTransition(() => {
      setFilteredIngredients(
        initIngredients?.filter(ingredient => 
          ingredient.name.toLowerCase().includes(query.toLowerCase())
        ) || []
      );
      setIsInitialLoad(false);
    });
  }, [initIngredients, query]);

  if (isInitialLoad) {
    return <SkeletonIngredientTable />;
  }

  return (
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
        <tbody className={isPending ? 'text-gray-400' : ''}>
          {filteredIngredients.map(ingredient => (
            <IngredientItem key={ingredient?.id} ingredient={ingredient} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
