import { Ingredient } from '../../types/ingredientTypes';
import IngredientItem from './IngredientItem';

export default function IngredientTable({ ingredients, isPending, onEdit, onDelete }: { ingredients: Ingredient[] }) {
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
          {ingredients?.map((ingredient: Ingredient) => (
            <IngredientItem key={ingredient?.id} ingredient={ingredient} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
