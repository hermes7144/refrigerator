import { RecipeItemProps } from '../../types/RecipeTypes';
import { DisplayDate } from '../ingredient/DisplayDate';

const ShoppingItem = ({ shopping, onSelect, isSelected }: RecipeItemProps) => {
  return (
    <tr className='hover:bg-gray-100 transition-colors duration-200'>
      <td className='py-2 px-4'>
        <div className='flex items-center gap-4'>
          <div className='avatar hidden sm:block'>
            <div className='mask mask-squircle w-10 h-10'>
              {shopping?.image ? (
                <img src={shopping.image} alt='Ingredient image' className='w-full h-full object-cover rounded-full' />
              ) : (
                <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 text-gray-500'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className='font-semibold text-gray-800'>{shopping.name}</div>
          </div>
        </div>
      </td>
      <td className='py-2 px-4 text-center'>
        <span className='text-gray-700 font-medium'>
          {shopping.qty} {shopping.unit}
        </span>
      </td>
      <td className='hidden md:block py-2 px-4 text-center'>
        {shopping.expiration ? (
          <span className='text-gray-600'>
            <DisplayDate date={shopping.expiration} />
          </span>
        ) : (
          <span className='text-gray-400'>No Expiry</span>
        )}
      </td>
      <td className='py-2 px-4 flex items-center justify-center'>
        <div className='flex items-center justify-center w-6 h-6 mt-2'>
          <input type='checkbox' className='w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2' checked={isSelected} onChange={() => onSelect(shopping.id)} />
        </div>
      </td>
    </tr>
  );
};

export default ShoppingItem;
