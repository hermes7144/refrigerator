import { useNavigate } from 'react-router-dom';
import { RecipeProps } from '../../types/RecipeTypes';
// import RecipeItem from './RecipeItem';
import ShoppingItem from './ShoppingItem';
import useShoppings from '../../hooks/useShoppings';

export default function ShoppingTable() {
  const {
    shoppingsQuery: { data: shoppings },
  } = useShoppings();
  const navigate = useNavigate();

  return (
    <div className='flex justify-center'>
      <table className='table-auto w-full'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-center w-1/2'>쇼핑 목록</th>
            <th className='px-4 py-2 text-center w-1/5'>수량</th>
            <th className='px-4 py-2 text-center w-1/5'>유통기한</th>
            <th className='w-1/10'></th>
          </tr>
        </thead>
        <tbody>
          {shoppings?.map((shopping) => (
            <ShoppingItem key={shopping.id} shopping={shopping} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
