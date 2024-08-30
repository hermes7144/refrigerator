import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useShoppings from '../hooks/useShoppings';
import CommonItemForm from '../components/common/CommonForm';
import { IngredientProps } from '../types/ingredientTypes';

const defaultItem: IngredientProps = {
  id: '',
  name: '',
  unit: 'g',
  qty: 0,
  category: '',
  expiration: '',
};

export default function RegisterShopping() {
  const location = useLocation();
  const { item = defaultItem } = location.state || {};
  const navigate = useNavigate();

  const { addShopping, updateShopping } = useShoppings();
  const [shoppingItem, setShoppingItem] = useState<IngredientProps>(item);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: keyof IngredientProps, value: string | number) => {
    setShoppingItem((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!shoppingItem.name.trim()) newErrors.name = '이름을 입력해주세요';
    if (isNaN(Number(shoppingItem.qty)) || shoppingItem.qty <= 0) newErrors.qty = '유효한 수량을 입력해주세요';
    if (!shoppingItem.category.trim()) newErrors.category = '카테고리를 선택해주세요';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (item.id) {
      updateShopping.mutate(shoppingItem);
    } else {
      addShopping.mutate(shoppingItem);
    }
    navigate(-1);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full md:w-2/3 lg:w-1/2 bg-white p-8'>
        <h2 className='text-2xl font-bold mb-6 text-center'>쇼핑 목록 등록</h2>
        <div className='w-full max-h-[600px] overflow-y-auto'>
          <CommonItemForm formData={shoppingItem} onChange={handleChange} errors={errors} />
        </div>
        <div className='w-full flex justify-between items-center mt-8'>
          <button className='btn btn-outline btn-secondary py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-200' onClick={() => navigate(-1)}>
            뒤로가기
          </button>
          <button className='btn btn-outline btn-primary py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200' onClick={handleSubmit}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
