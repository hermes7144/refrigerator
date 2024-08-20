// import RecipeItem from './RecipeItem';
import ShoppingItem from './ShoppingItem';
import useShoppings from '../../hooks/useShoppings';
import { useState } from 'react';

export default function ShoppingTable({ setSelectedItems }) {
  const { shoppingsQuery } = useShoppings();
  const { data: shoppings } = shoppingsQuery || {};
  const [selectedItemsState, setSelectedItemsState] = useState([]);

  const handleSelectItem = (id) => {
    const updatedSelection = selectedItemsState.includes(id) ? selectedItemsState.filter((item) => item !== id) : [...selectedItemsState, id];

    setSelectedItemsState(updatedSelection);
    setSelectedItems(updatedSelection.map((itemId) => shoppings.find((item) => item.id === itemId)));
  };

  return (
    <div className='flex justify-center'>
      <table className='table-auto w-full'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-center w-1/2'>쇼핑 목록</th>
            <th className='px-4 py-2 text-center w-1/5'>수량</th>
            <th className='hidden md:table-cell px-4 py-2 text-center w-1/5'>유통기한</th>
            <th className='w-1/10'></th>
          </tr>
        </thead>
        <tbody>
          {shoppings?.map((shopping) => (
            <ShoppingItem key={shopping.id} shopping={shopping} isSelected={selectedItemsState.includes(shopping.id)} onSelect={handleSelectItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
