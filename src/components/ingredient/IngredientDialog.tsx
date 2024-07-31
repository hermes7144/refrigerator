import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IngredientDialogProps, IngredientProps } from '../../types/ingredientTypes';
import useIngredients from '../../hooks/useIngredients';
import { formatDate } from '../../utils/utils';


const initializeIngredient = (initialIngredient: IngredientProps | null) => ({
  id: initialIngredient?.id || '',
  name: initialIngredient?.name || '',
  qty: initialIngredient?.qty || 0,
  unit: initialIngredient?.unit || 'g',
  category: initialIngredient?.category || '',
  expiration: initialIngredient?.expiration ? formatDate(new Date(initialIngredient.expiration)) : '',
});

const IngredientDialog = ({ visible, onClose, initialIngredient }: IngredientDialogProps) => {
  const { addIngredient, updateIngredient } = useIngredients();
  const [ingredient, setIngredient] = useState<IngredientProps>(initializeIngredient(initialIngredient));
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (visible) {
      modalRef.current?.showModal();
      setIngredient(initializeIngredient(initialIngredient));
      setErrors({});
    } else {
      modalRef.current?.close();
    }
  }, [visible, initialIngredient]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIngredient(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setIngredient(prev => ({ ...prev, expiration: date ? formatDate(date) : '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!ingredient.name.trim()) newErrors.name = '이름을 입력해주세요';
    if (!ingredient.qty || isNaN(Number(ingredient.qty))) newErrors.qty = '유효한 수량을 입력해주세요';
    if (!ingredient.category.trim()) newErrors.category = '카테고리를 선택해주세요';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (ingredient.id) {
      updateIngredient.mutate(ingredient);
    } else {
      addIngredient.mutate(ingredient);
    }
    onClose();
  };

  return (
    <dialog ref={modalRef} id='my_modal_1' className='modal modal-bottom sm:modal-middle' onCancel={onClose}>
      <div className='modal-box flex flex-col pt-16'>
        <div className='flex flex-col gap-2'>
          <label className='input input-bordered flex items-center gap-2'>
            이름
            <input type='text' className='grow' value={ingredient.name} name='name' onChange={handleChange} />
          </label>
          {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}

          <div className='flex gap-1'>
            <label className='input input-bordered flex items-center gap-2 w-full'>
              수량
              <input type='number' className='grow' value={ingredient.qty} name='qty' onChange={handleChange} />
            </label>
            <select className='select select-bordered max-w-[70px] text-l' name='unit' onChange={handleChange} value={ingredient.unit}>
              <option value='g'>g</option>
              <option value='ea'>개</option>
            </select>
          </div>
          {errors.qty && <p className='text-red-500 text-sm'>{errors.qty}</p>}

          <select className='select select-bordered' name='category' onChange={handleChange} value={ingredient.category}>
            <option value='' disabled>카테고리</option>
            <option value='grain'>곡물</option>
            <option value='meat'>고기</option>
            <option value='seafood'>해산물</option>
            <option value='vegetable'>아채</option>
            <option value='fruit'>과일</option>
            <option value='condiment'>조미료</option>
            <option value='etc'>기타</option>
          </select>
          {errors.category && <p className='text-red-500 text-sm'>{errors.category}</p>}

          <div className='label'>
            <span className='label-text'>유통기한</span>
          </div>
          <DatePicker
            className='w-full h-12 border-gray-200 border-2 rounded-lg pl-2'
            selected={ingredient.expiration ? new Date(ingredient.expiration) : null}
            onChange={handleDateChange}
            dateFormat='yyyy-MM-dd'
            isClearable
          />
          {errors.expiration && <p className='text-red-500 text-sm'>{errors.expiration}</p>}
        </div>
        <div className='modal-action'>
          <button className='btn btn-sm' onClick={onClose}>취소</button>
          <button className='btn btn-sm' onClick={handleSubmit}>확인</button>
        </div>
      </div>
    </dialog>
  );
};

export default IngredientDialog;
