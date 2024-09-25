import React from 'react';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

interface CustomDatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  label?: string;
  className?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ selectedDate, onChange, label = '유통기한' }) => {
  return (
    <>
    <div className="label">
        <span className="label-text">{label}</span>
      </div>
        <DatePicker
          locale="ko"
          className={`w-full p-3 rounded-lg border border-gray-300 min-h-14 focus:outline-none focus:border-blue-500`}
          selected={selectedDate}
          onChange={onChange}
          dateFormat='yyyy.MM.dd'
          isClearable
          placeholderText=''
        />
    </>
  );
};

export default CustomDatePicker;
