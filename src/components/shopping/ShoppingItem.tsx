import { RecipeItemProps } from '../../types/RecipeTypes';
import { DisplayDate } from '../ingredient/DisplayDate';

const ShoppingItem = ({ shopping, onEdit }: RecipeItemProps) => {
  return (
    <tr>
      <td>
        <div className='flex items-center gap-3'>
          <div className='avatar hidden sm:block'>
            <div className='mask mask-squircle w-8 h-8'>{shopping?.image ? <img src='' alt='Ingredient image' /> : <div className='w-8 h-8 bg-gray-100 rounded-full'></div>}</div>
          </div>
          <div>
            <div className='font-bold'>{shopping.name}</div>
          </div>
        </div>
      </td>
      <td className='text-center'>
        {shopping.qty}
        {shopping.unit}
      </td>
      <td className='text-center'>{shopping.expiration ? <DisplayDate date={shopping.expiration} /> : ''}</td>

      <td className='flex items-center justify-center h-full'>
        <input type='checkbox' className='w-5 h-5' />
      </td>
    </tr>
  );
};

export default ShoppingItem;
