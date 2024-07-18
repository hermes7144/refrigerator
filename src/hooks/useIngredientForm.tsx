import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { IngredientProps } from '../types/ingredientTypes';

export const useIngredientForm = (initialIngredient?: IngredientProps) => {
  const [ingredient, setIngredient] = useState<IngredientProps>({ name: '', qty: 0, unit: 'g', category: '', expiration: '' });
  const [validationErrors, setValidationErrors] = useState<{ name?: string; qty?: string; category?: string }>({});

  useEffect(() => {    
    if (initialIngredient) {
      setIngredient({
        ...initialIngredient,
        expiration: initialIngredient.expiration ? dayjs(initialIngredient.expiration).format('YYYY-MM-DD') : ''
      });
    }
  }, [initialIngredient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIngredient(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIngredient(prev => ({ ...prev, [name]: value }));
  };

  const handleExpirationDateChange = (date: Date | null) => {
    setIngredient(prev => ({ ...prev, expiration: date ? dayjs(date).format('YYYY-MM-DD') : '' }));
  };

  const validateForm = () => {
    const errors: { name?: string; qty?: string; category?: string } = {};
    if (!ingredient.name.trim()) errors.name = '이름을 입력해주세요';
    if (!ingredient.qty || isNaN(Number(ingredient.qty))) errors.qty = '유효한 수량을 입력해주세요';
    if (!ingredient.category.trim()) errors.category = '카테고리를 선택해주세요';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setIngredient({ name: '', qty: 0, unit: 'g', category: '', expiration: '' });
    setValidationErrors({});
  };

  return {
    ingredient,
    validationErrors,
    handleInputChange,
    handleSelectChange,
    handleExpirationDateChange,
    validateForm,
    resetForm
  };
};
