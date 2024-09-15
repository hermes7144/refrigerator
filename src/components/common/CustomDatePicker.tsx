import React from 'react';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

interface CustomDatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ selectedDate, onChange, placeholder = '유통기한' }) => {
  return (
    <DatePicker
      locale="ko"
      className={`w-full p-3 rounded-lg border border-gray-300 min-h-14 focus:outline-none focus:border-blue-500`}
      selected={selectedDate}
      onChange={onChange}
      dateFormat='yyyy.MM.dd'
      isClearable
      placeholderText={placeholder}
    />
  );
};

export default CustomDatePicker;
