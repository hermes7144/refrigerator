import { BsThreeDotsVertical } from 'react-icons/bs';
import { IngredientItemProps } from '../../types/ingredientTypes';
import { DisplayDate } from './DisplayDate';

export const IngredientItem = ({ ingredient, onEdit, onDelete }: IngredientItemProps) => {
  return (
    <tr>
      <td>
        <div className='flex items-center gap-3'>
          <div className='avatar hidden sm:block'>
            <div className='mask mask-squircle w-8 h-8'>{ingredient?.image ? <img src='' alt='Ingredient image' /> : <div className='w-8 h-8 bg-gray-100 rounded-full'></div>}</div>
          </div>
          <div>
            <div className='font-bold'>{ingredient.name}</div>
            {/* <div className='text-sm opacity-50'>{ingredient.category}</div> */}
          </div>
        </div>
      </td>
      <td className='text-center'>
        {ingredient.qty}
        {ingredient.unit}
      </td>
      <td className='text-center'>{ingredient.expiration ? <DisplayDate date={ingredient.expiration} /> : ''}</td>
      <td className='text-center'>
        <div className='dropdown dropdown-left sm:dropdown-right'>
          <button tabIndex={0} role='button' className='btn btn-ghost rounded-full'>
            <BsThreeDotsVertical />
          </button>
          <ul tabIndex={0} className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-20'>
            <li>
              <a onClick={() => onEdit(ingredient)}>수정</a>
            </li>
            <li>
              <a onClick={() => onDelete(ingredient)}>삭제</a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};
