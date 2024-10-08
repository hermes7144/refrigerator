import { ChangeEvent } from 'react';

interface SelectInputProps {
  name: string;
  value: string;
  label?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SelectField = ({ name, value, label, options, onChange, error }: SelectInputProps) => (
  <div className=''>
    <div className="label">
      <span className="label-text min-h-5">{label}</span>
    </div>
    <select
      className='select select-bordered w-full min-w-28 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 min-h-[56px]' // 최소 높이 설정
      name={name}
      onChange={onChange}
      value={value}>
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className='text-red-500 text-sm mt-1'>{error}</p>} {/* 에러 메시지와 선택 필드 간격 추가 */}
  </div>
);

export default SelectField;
