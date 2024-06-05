import { Link } from 'react-router-dom';

export default function MealItem({ meal }: { meal: string }) {
  return (
    <div className='w-[300px] h-16 bg-slate-200 p-1'>
      {meal}
      <div className='border border-red-200 font-bold'>
        <Link className='flex ' to='/meal'>
          <div className='flex items-center justify-center rounded-full bg-blue-600 w-5 h-5'>
            <svg width='10px' height='10px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M4 12H20M12 4V20' stroke='#ffffff' stroke-width='5' stroke-linecap='round' stroke-linejoin='round' />
            </svg>
          </div>
          <span>식사 추가</span>
        </Link>
      </div>
    </div>
  );
}
