import { useEffect, useState, useTransition } from 'react';
import useIngredients from '../../hooks/useIngredients';
import { Ingredient, IngredientTableProps } from '../../types/ingredientTypes';
import IngredientItem from './IngredientItem';

export default function IngredientTable({ query, onEdit, onDelete }: IngredientTableProps) {
  const { ingredientsQuery: { data: initIngredients} } = useIngredients();
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setFilteredIngredients(
        initIngredients?.filter(ingredient => 
          ingredient.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    })

  }, [initIngredients, query]);

  return (
    <div className='flex justify-center'>
      <table className='table-auto w-full'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-center'>Ingredient</th>
            <th className='px-4 py-2 text-center'>Qty</th>
            <th className='px-4 py-2 text-center'>Expiration</th>
            <th className='px-4 py-2 w-8'></th>
          </tr>
        </thead>
        <tbody className={isPending ? 'text-gray-400' : ''}>
          {filteredIngredients?.map(ingredient => <IngredientItem key={ingredient?.id} ingredient={ingredient} onEdit={onEdit} onDelete={onDelete} /> )}
        </tbody>
      </table>
    </div>
  );
}
