import { ChangeEvent } from 'react';

interface TextFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const TextField = ({ name, placeholder, value, onChange, error }: TextFieldProps) => (
  <div className='flex flex-col'>
    <input
      type='text'
      className='input input-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 min-h-14' // 최소 높이 설정
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && <p className='text-red-500 text-sm mt-1'>{error}</p>} {/* 에러 메시지와 입력 필드 간격 추가 */}
  </div>
);

export default TextField;
