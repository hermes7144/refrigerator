import { SearchInputProps } from '../../types/commonTypes';

export default function SearchInput({ query, onChange } :SearchInputProps) {
  return (
    <div className='flex-1 relative w-full max-w-xs'>
      <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </span>
      <input
        type='text'
        placeholder='검색하기...'
        className='input input-bordered pl-10 w-full h-10'
        value={query}
        onChange={onChange}
      />
    </div>
  );
}