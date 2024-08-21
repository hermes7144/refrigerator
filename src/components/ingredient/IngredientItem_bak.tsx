import { IngredientItemProps } from '../../types/ingredientTypes';
import { DisplayDate } from './DisplayDate';

const IngredientItem = ({ ingredient }: IngredientItemProps) => {
  return (
    <tr className='h-12'>
      <td>
        <div className='flex items-center gap-3'>
          <div className='avatar hidden sm:block'>
            <div className='mask mask-squircle w-8 h-8'>{ingredient?.image ? <img src='' alt='Ingredient image' /> : <div className='w-8 h-8 bg-gray-100 rounded-full'></div>}</div>
          </div>
          <div>
            <div className={`font-bold ${ingredient.qty === 0 && 'text-gray-400'}`}>{ingredient.name}</div>
          </div>
        </div>
      </td>
      <td className='text-center'>
        {ingredient.qty}
        {ingredient.unit}
      </td>
      <td className='text-center'>{ingredient.expiration ? <DisplayDate date={ingredient.expiration} /> : ''}</td>
    </tr>
  );
};
export default IngredientItem;
