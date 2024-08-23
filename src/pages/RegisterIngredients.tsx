import React, { useState } from 'react';
import CommonItemForm from '../components/common/CommonForm';
import { IngredientProps } from '../types/ingredientTypes';
import useIngredients from '../hooks/useIngredients';
import { useLocation, useNavigate } from 'react-router-dom';
// import { formatDate } from '../utils/utils';

const defaultItem: IngredientProps = {
  id: '',
  name: '',
  unit: 'g',
  qty: 0,
  category: '',
  expiration: '',
};

export default function RegisterIngredients() {
  const location = useLocation();
  const { ingredient = defaultItem } = location.state || {};

  const navigate = useNavigate();

  const { addIngredient, updateIngredient } = useIngredients();
  const [ingredientItem, setIngredientItem] = useState<IngredientProps>(ingredient);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: keyof IngredientProps, value: string | number) => {
    setIngredientItem((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!ingredientItem.name.trim()) newErrors.name = '이름을 입력해주세요';
    if (isNaN(Number(ingredientItem.qty))) newErrors.qty = '유효한 수량을 입력해주세요';
    if (!ingredientItem.category.trim()) newErrors.category = '카테고리를 선택해주세요';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (ingredientItem.id) {
      updateIngredient.mutate(ingredientItem);
    } else {
      addIngredient.mutate(ingredientItem);
    }
    navigate(-1);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full md:w-2/3 lg:w-1/2 bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center'>재료 등록</h2>
        <div className='w-full max-h-[600px] overflow-y-auto'>
          <CommonItemForm formData={ingredientItem} onChange={handleChange} errors={errors} />
        </div>
        <div className='w-full flex justify-between items-center mt-8'>
          <button className='btn btn-secondary py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-200' onClick={() => navigate(-1)}>
            뒤로가기
          </button>
          <button className='btn btn-primary py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200' onClick={handleSubmit}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
