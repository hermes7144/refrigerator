import { ChangeEvent } from 'react';

interface TextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const TextField = ({ name, label, value, onChange, error }: TextFieldProps) => (
<label className="form-control w-full">
  <div className="label">
    <span className="label-text">{label}</span>
  </div>
  <input
      type='text'
      className='input input-bordered w-full min-w-20 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 min-h-14' // 최소 높이 설정
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && <p className='text-red-500 text-sm mt-1'>{error}</p>} {/* 에러 메시지와 입력 필드 간격 추가 */}
  </label>
);

export default TextField;
