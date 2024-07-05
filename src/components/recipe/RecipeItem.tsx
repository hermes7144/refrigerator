import { BsThreeDotsVertical } from 'react-icons/bs';
import { Ingredient } from '../../types/ingredientTypes';
import { Recipe } from '../../types/RecipeTypes';

 const RecipeItem = ({ recipe, onEdit, onDelete }: {recipe: Recipe})=> {
  return (
    <tr>
      <td>
        <div className='flex items-center gap-3'>
          <div className='avatar hidden sm:block'>
            <div className='mask mask-squircle w-8 h-8'>{recipe?.image ? <img src='' alt='Ingredient image' /> : <div className='w-8 h-8 bg-gray-100 rounded-full'></div>}</div>
          </div>
          <div>
            <div className='font-bold'>{recipe.name}</div>
            {/* <div className='text-sm opacity-50'>{ingredient.category}</div> */}
          </div>
        </div>
      </td>
      <td>
        {Object.values(recipe?.ingredients).map((ingredient: Ingredient) => <p>{ingredient.name + ingredient.qty + ingredient.unit}</p>)}
      </td>
      <td className='text-center'>
        <div className='dropdown dropdown-left sm:dropdown-right'>
          <button tabIndex={0} role='button' className='btn btn-ghost rounded-full'>
            <BsThreeDotsVertical />
          </button>
          <ul tabIndex={0} className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-20'>
            <li>
              <a onClick={() => onEdit(recipe)}>수정</a>
            </li>
            <li>
              <a onClick={() => onDelete(recipe)}>삭제</a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default RecipeItem;