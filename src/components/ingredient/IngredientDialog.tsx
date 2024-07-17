import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko'); // global로 한국어 locale 사용
import 'react-datepicker/dist/react-datepicker.css';
import { IngredientDialogProps, IngredientProps } from '../../types/ingredientTypes';
import useIngredients from '../../hooks/useIngredients';

export default function IngredientDialog({ visible, onClose, initialIngredient }: IngredientDialogProps) {
  const { addIngredient, updateIngredient } = useIngredients();
  const [ingredient, setIngredient] = useState({ name: '', qty: 0 });
  const [unit, setUnit] = useState<string>('g');
  const [category, setCategory] = useState<string>('');
  const [expiration, setExpiration] = useState<Date>();
  const [errors, setErrors] = useState<{ name?: string; qty?: string; category?: string }>({});
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalRef.current) return;
    
    if (visible) {
      modalRef.current.showModal();
      handleInit();
    } else {
      modalRef.current.close();
    }
  }, [visible]);

  useEffect(() => {    
    if (initialIngredient) {
      setIngredient(initialIngredient);
      setUnit(initialIngredient.unit);
      setCategory(initialIngredient.category);
      setExpiration(initialIngredient.expiration ? new Date(initialIngredient.expiration) : undefined);
    }
  }, [initialIngredient]);  

  const handleInit =() => {
    setIngredient({ name: '', qty: 0 });
    setUnit('g');
    setCategory('');
    setExpiration(undefined);
    setErrors({});
  }

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

  const validate = () => {
    const newErrors: { name?: string; qty?: string; category?: string } = {};
    
    if (!ingredient.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }
    if (!ingredient.qty || isNaN(Number(ingredient.qty))) {
      newErrors.qty = '유효한 수량을 입력해주세요';
    }
    if (!category.trim()) {
      newErrors.category = '카테고리를 선택해주세요';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (): void => {
    if (!validate()) {
      return;
    }

    const newIngredient: IngredientProps = {
      id: initialIngredient ? initialIngredient.id : '',
      name: ingredient.name,
      qty: Number(ingredient.qty),
      unit,
      category,
      expiration: expiration ? dayjs(expiration).format('YYYY-MM-DD') : '',
    };

    if (newIngredient.id) {
      updateIngredient.mutate(newIngredient);
    } else {
      addIngredient.mutate(newIngredient);
    }
    onClose();
  };

  return (
    <dialog ref={modalRef} id='my_modal_1' className='modal modal-bottom sm:modal-middle' onCancel={onClose}>
      <div className='modal-box flex flex-col pt-16'>
        <div className='flex flex-col gap-2'>
          <label className={`input input-bordered flex items-center gap-2`}>
            이름
            <input type='text' className='grow' value={ingredient.name || ''} name='name' onChange={handleChange} />
          </label>
          {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
          
          <div className='flex gap-1'>
            <label className={`input input-bordered flex items-center gap-2 w-full`}>
              수량
              <input type='text' className='grow' value={ingredient.qty || '' } name='qty' onChange={handleChange} />
            </label>
            <select className='select select-bordered max-w-[70px] text-l' onChange={handleChangeUnit} value={unit}>
              <option value='g'>g</option>
              <option value='ea'>개</option>
            </select>
          </div>
          {errors.qty && <p className='text-red-500 text-sm'>{errors.qty}</p>}

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
          {errors.category && <p className='text-red-500 text-sm'>{errors.category}</p>}
          <div className="label">
            <span className="label-text">유통기한</span>
          </div>      
            <DatePicker className='w-full h-12 border-gray-200 border-2 rounded-lg pl-2' toggleCalendarOnIconClick selected={expiration} onChange={handleDateChange} dateFormat='yyyy-MM-dd' isClearable />
        </div>
        <div className='modal-action'>
          <button className='btn btn-sm' onClick={onClose}>
            취소
          </button>
          <button className='btn btn-sm' onClick={handleSubmit}>
            확인
          </button>
        </div>
      </div>
    </dialog>
  );
}
