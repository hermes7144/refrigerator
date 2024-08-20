// CustomDatePicker.tsx
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ selectedDate, onChange, placeholder = '유통기한', className = '' }) => {
  return (
    <DatePicker
      className={`w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 ${className}`}
      selected={selectedDate}
      onChange={onChange}
      dateFormat='yyyy-MM-dd'
      isClearable
      placeholderText={placeholder}
    />
  );
};

export default CustomDatePicker;
