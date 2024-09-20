import { Link } from 'react-router-dom';
import { RecipeItemProps } from '../../types/RecipeTypes';

const RecipeItem = ({ item, onSelect, isSelected }: RecipeItemProps) => {
  return (
    <tr>
      <td>
        <Link to='new' state={{ item }} className='w-full h-full flex'>
          <div className='flex items-center gap-3'>
            <div className='avatar hidden sm:block'>
              <div className='mask mask-squircle w-8 h-8'>{item?.image ? <img src='' alt='Ingredient image' /> : <div className='w-8 h-8 bg-gray-100 rounded-full'></div>}</div>
            </div>
            <div>
              <div className='font-bold'>{item.name}</div>
            </div>
          </div>
        </Link>
      </td>
      <td>
        <ul>
          {item?.ingredients.map((ingredient) => (
            <li key={item.id + ingredient.id}>{ingredient.name + ingredient.qty + ingredient.unit}</li>
          ))}
        </ul>
      </td>
      <td className='py-4 px-6 flex items-center justify-center'>
        <input type='checkbox' className='w-5 h-5 mt-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2' checked={isSelected} onChange={() => onSelect(item.id)} />
      </td>
      {/* <td className='text-center'>
        <div className='dropdown dropdown-left sm:dropdown-right'>
          <button tabIndex={0} role='button' className='btn btn-ghost rounded-full'>
            <HiDotsVertical />
          </button>
          <ul tabIndex={0} className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-20'>
            <li>
              <a onClick={() => onEdit(recipe)}>수정</a>
            </li>
            <li>
              <a onClick={() => onOpenDialog(recipe)}>삭제</a>
            </li>
          </ul>
        </div>
      </td> */}
    </tr>
  );
};

export default RecipeItem;
