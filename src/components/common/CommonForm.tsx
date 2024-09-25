import { ChangeEvent } from 'react';
import TextField from './TextField';
import SelectField from './SelectField';
import CustomDatePicker from './CustomDatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

interface Item {
  id?: string;
  name: string;
  unit: string;
  qty: number;
  category: string;
  expiration?: string;
}

interface FormProps {
  formData: Item;
  onChange: (field: keyof Item, value: string | number) => void;
  errors: { [key: string]: string };
}

function CommonItemForm({ formData, onChange, errors }: FormProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'qty' ? Number(value) : value;
    onChange(name as keyof Item, newValue);
  };

  const handleDateChange = (date: Date | null) => {
    onChange('expiration', date ? dayjs(date).format('YYYY-MM-DD') : '');
  };

  return (
    <div className='w-full max-h-[600px] overflow-y-auto'>
      <label className="form-control w-full">
        <TextField name='name' label='재료 이름' value={formData.name} onChange={handleInputChange} error={errors.name} />
        <div className='flex gap-2'>
          <TextField name='qty' label='재료 수량' value={formData.qty !== 0 ? formData.qty.toString() : ''} onChange={handleInputChange} error={errors.qty} />
          <SelectField
            name='unit'
            value={formData.unit}
            options={[
              { value: 'g', label: 'g' },
              { value: 'ea', label: '개' },
              { value: 'ml', label: 'ml' },
            ]}
            onChange={handleInputChange}
          />
        </div>
        <SelectField
          name='category'
          value={formData.category}
          label='분류'
          options={[
            { value: '', label: '선택' },
            { value: 'grain', label: '곡물' },
            { value: 'meat', label: '고기' },
            { value: 'seafood', label: '해산물' },
            { value: 'vegetable', label: '아채' },
            { value: 'fruit', label: '과일' },
            { value: 'condiment', label: '조미료' },
            { value: 'etc', label: '기타' },
          ]} // props로 전달된 카테고리 옵션 사용
          onChange={handleInputChange}
          error={errors.category}
        />
        <CustomDatePicker selectedDate={formData.expiration ? new Date(formData.expiration) : null} onChange={handleDateChange} label='유통기한' />
      </label>
    </div>
  );
}

export default CommonItemForm;
