import MealItem from '../components/MealItem';
import { getWeekDates } from '../ts/util';

export default function Home() {
  const week = getWeekDates();

  return (
    <div className='px-4'>
      <div className='flex flex-col items-center'>
        <ul className='flex w-full justify-center gap-2 p-2'>
          {week.map((weekday) => (
            <li className='flex flex-col items-center' key={weekday.day}>
              {weekday.day}
              <div className='flex items-center justify-center bg-slate-300 rounded-full w-10 h-10 text-xl'>{weekday.date}</div>
            </li>
          ))}
        </ul>
        <ul className='gap-2 p-2'>
          {week.map((weekday) => (
            <div key={weekday.day} className='flex flex-col gap-1'>
              {`${weekday.day}요일, ${weekday.month}. ${weekday.date}`}
              <MealItem meal={'아침'} />
              <MealItem meal={'점심'} />
              <MealItem meal={'저녁'} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
