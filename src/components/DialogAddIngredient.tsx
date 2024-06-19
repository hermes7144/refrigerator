import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko'); // global로 한국어 locale 사용

import 'react-datepicker/dist/react-datepicker.css';
import { DialogAddIngredientProps, Ingredient } from '../types/ingredientTypes';

export default function DialogAddIngredient({ onSubmit, onClose, initialIngredient }: DialogAddIngredientProps) {
  const [ingredient, setIngredient] = useState({ name: '', qty: 0 });
  const [unit, setUnit] = useState<string>('g');
  const [category, setCategory] = useState<string>('');
  const [expiration, setExpiration] = useState<Date>();

  useEffect(() => {
    if (initialIngredient) {
      setIngredient(initialIngredient);
      setUnit(initialIngredient.unit);
      setCategory(initialIngredient.category);
      setExpiration(initialIngredient.expiration ? new Date(initialIngredient.expiration) : undefined);
    } else {
      setIngredient({ name: '', qty: 0 });
      setUnit('g');
      setCategory('');
      setExpiration(undefined);
    }
  }, [initialIngredient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setIngredient({ ...ingredient, [name]: value });
  };

  const handleChangeUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.currentTarget.value);
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };

  const handleDateChange = (date: Date | null) => {
    setExpiration(date ? date : undefined);
  };

  const handleSubmit = (): void => {
    const newIngredient: Ingredient = {
      id: initialIngredient ? initialIngredient.id : '',
      name: ingredient.name,
      qty: Number(ingredient.qty),
      unit,
      category,
      expiration: expiration ? dayjs(expiration).format('YYYY-MM-DD') : '',
    };

    onSubmit(newIngredient);
    handleClose();
  };

  const handleClose = (): void => {
    onClose();
  };

  return (
    <dialog id='my_modal_1' className='modal modal-bottom sm:modal-middle'>
      <div className='modal-box flex flex-col pt-16'>
        <div className='flex flex-col gap-4'>
          <label className={`input input-bordered flex items-center gap-2`}>
            이름
            <input type='text' className='grow' value={ingredient.name || ''} name='name' onChange={handleChange} />
          </label>
          <div className='flex gap-1'>
            <label className={`input input-bordered flex items-center gap-2 w-full`}>
              수량
              <input type='text' className='grow' value={ingredient.qty || ''} name='qty' onChange={handleChange} />
            </label>
            <select className='select select-bordered max-w-[70px] text-l' onChange={handleChangeUnit} value={unit}>
              <option value='g'>g</option>
              <option value='ea'>개</option>
            </select>
          </div>
          <select className='select select-bordered' onChange={handleChangeCategory} value={category}>
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
          유통기한
          <DatePicker className='w-full h-12 border-gray-200 border-2 rounded-lg pl-2' toggleCalendarOnIconClick selected={expiration} onChange={handleDateChange} dateFormat='yyyy-MM-dd' isClearable />
        </div>
        <div className='modal-action'>
          <button className='btn btn-sm' onClick={handleClose}>
            취소
          </button>
          <button className='btn btn-sm' onClick={handleSubmit}>
            확인
          </button>
        </div>
      </div>
      {/* <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form> */}
    </dialog>
  );
}
