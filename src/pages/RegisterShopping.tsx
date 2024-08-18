import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDate } from '../utils/utils';
import useShoppings from '../hooks/useShoppings';

interface ShoppingItem {
  id: string;
  name: string;
  unit: string;
  qty: number;
  category: string;
  expiration: string;
}

const defaultItem: ShoppingItem = { id: '', name: '', unit: 'g', qty: 0, category: '', expiration: '' };

export default function RegisterShopping() {
  const { addShopping } = useShoppings();
  const navigate = useNavigate();
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(Array(1).fill(defaultItem));

  const handleAddIngredient = () => {
    setShoppingList([...shoppingList, defaultItem]);
  };

  const handleChange = (index: number, field: keyof ShoppingItem, value: string | number) => {
    setShoppingList((prev) => {
      const updatedList = [...prev];
      updatedList[index] = { ...updatedList[index], [field]: value };
      return updatedList;
    });
  };

  const handleSubmit = () => {
    const filteredList = shoppingList.filter((item) => item.name.trim() !== '' && item.unit.trim() !== '' && item.category.trim() !== '' && item.qty > 0);
    filteredList.forEach((item) => addShopping.mutate(item));
    navigate(-1);
  };

  return (
    <div className='flex flex-col pt-8 md:pt-20 items-center'>
      <div className='w-full md:w-2/3 lg:w-1/2 bg-white p-6'>
        {/* <button className='btn btn-success text-white py-2 px-4 mb-4 rounded-lg hover:bg-green-600 transition duration-200' onClick={handleAddIngredient}>
          Add Item
        </button> */}
        <div className='w-full max-h-80 overflow-y-auto'>
          {shoppingList.map((item, index) => (
            <ShoppingItemForm key={index} item={item} index={index} onChange={handleChange} />
          ))}
        </div>
        <div className='w-full flex justify-between items-center mt-6'>
          <button className='btn btn-secondary py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200' onClick={() => navigate(-1)}>
            Back
          </button>
          <button className='btn btn-primary py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200' onClick={handleSubmit}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

interface ShoppingItemFormProps {
  item: ShoppingItem;
  index: number;
  onChange: (index: number, field: keyof ShoppingItem, value: string | number) => void;
}

function ShoppingItemForm({ item, index, onChange }: ShoppingItemFormProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement> | Date | null) => {
    if (e instanceof Date) {
      // Handle Date object
      const formattedDate = formatDate(e);
      onChange(index, 'expiration' as keyof ShoppingItem, formattedDate);
    } else if (e === null) {
      // Handle null value (when date is cleared)
      onChange(index, 'expiration' as keyof ShoppingItem, '');
    } else {
      // Handle ChangeEvent object
      const { name, value } = e.target;
      const newValue = name === 'qty' ? Number(value) : value;
      onChange(index, name as keyof ShoppingItem, newValue);
    }
  };

  return (
    <div className='flex flex-col md:flex-row items-center bg-gray-50 p-4 mb-2 rounded-lg shadow-sm'>
      <input type='text' className='input input-bordered w-full md:w-1/5 mb-2 md:mb-0 md:mr-2 p-2 rounded-lg' placeholder='Item Name' name='name' value={item.name} onChange={handleChange} />
      <input
        type='text'
        className='input input-bordered w-full md:w-1/6 mb-2 md:mb-0 md:mr-2 p-2 rounded-lg'
        placeholder='Quantity'
        name='qty'
        value={item.qty === 0 ? '' : item.qty}
        onChange={handleChange}
      />
      <select className='select select-bordered w-full md:w-1/6 mb-2 md:mb-0 md:mr-2 p-2 rounded-lg' name='unit' onChange={handleChange} value={item.unit}>
        <option value='g'>g</option>
        <option value='ea'>개</option>
      </select>
      <select className='select select-bordered w-full md:w-1/6 mb-2 md:mb-0 md:mr-2 p-2 rounded-lg' name='category' onChange={handleChange} value={item.category}>
        <option value='' disabled>
          카테고리
        </option>
        <option value='grain'>곡물</option>
        <option value='meat'>고기</option>
        <option value='seafood'>해산물</option>
        <option value='vegetable'>아채</option>
        <option value='fruit'>과일</option>
        <option value='condiment'>조미료</option>
        <option value='etc'>기타</option>
      </select>
      <div className='w-full flex'>
        <DatePicker
          className='flex-1 h-12 border-gray-300 border rounded-lg pl-2'
          selected={item.expiration ? new Date(item.expiration) : null}
          onChange={handleChange}
          dateFormat='yyyy-MM-dd'
          isClearable
          placeholderText='날짜'
        />
      </div>
    </div>
  );
}
