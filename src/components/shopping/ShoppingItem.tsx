import { Link } from 'react-router-dom';
import { DisplayDate } from '../ingredient/DisplayDate';

const ShoppingItem = ({ shopping, onSelect, isSelected }) => {
  return (
    <tr className='hover:bg-gray-100 transition-colors duration-200 '>
      <td className='py-4 px-6 text-gray-800 hover:text-blue-600 transition-colors duration-200'>
        <Link to={`/shoppings/new`} state={{ shopping }} className='w-full h-full flex'>
          <div className='flex items-center gap-4'>
            <div className='avatar hidden sm:block'>
              <div className='mask mask-squircle w-10 h-10'>
                {shopping?.image ? <img src={shopping.image} alt='Ingredient image' /> : <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'></div>}
              </div>
            </div>
            <div>
              <div className='font-semibold '>{shopping.name}</div>
            </div>
          </div>
        </Link>
      </td>
      <td className='py-4 px-6 text-center'>
        <span className='text-gray-700 font-medium'>
          {shopping.qty} {shopping.unit}
        </span>
      </td>
      <td className='py-4 px-6 text-center hidden md:table-cell'>
        {shopping.expiration && (
          <span className='text-gray-600'>
            <DisplayDate date={shopping.expiration} />
          </span>
        )}
      </td>
      <td className='py-4 px-6 flex items-center justify-center'>
        <input type='checkbox' className='w-5 h-5 mt-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2' checked={isSelected} onChange={() => onSelect(shopping.id)} />
      </td>
    </tr>
  );
};

export default ShoppingItem;
