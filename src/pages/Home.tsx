import MealItem from '../components/MealItem';
import UseMeals from '../hooks/useMeals';
import { getWeekDates } from '../ts/util';

const dayNames = ['월', '화', '수', '목', '금', '토', '일'];

export default function Home() {
  const {
    mealsQuery: { data: meals, isLoading, isError },
  } = UseMeals();
  const week = getWeekDates();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading meals</div>;
  }

  return (
    <div className='px-4'>
      <div className='flex flex-col items-center'>
        <ul className='flex w-full justify-center gap-2 p-2'>
          {week.map((weekday, i) => (
            <li className='flex flex-col items-center' key={i}>
              <div className='flex items-center justify-center bg-slate-300 rounded-full w-10 h-10 text-xl'>{weekday.getDate()}</div>
            </li>
          ))}
        </ul>
        <ul className='gap-2 p-2'>
          {week.map((weekday, i) => {
            const formattedDate = `${weekday.getFullYear()}-${(weekday.getMonth() + 1).toString().padStart(2, '0')}-${weekday.getDate().toString().padStart(2, '0')}`;
            return (
              <div key={i} className='flex flex-col gap-1'>
                {`${dayNames[i]}요일, ${weekday.getMonth() + 1}. ${weekday.getDate()}`}
                <MealItem meal={'breakfast'} date={formattedDate} meals={meals?.[formattedDate]?.breakfast || null} />
                <MealItem meal={'lunch'} date={formattedDate} meals={meals?.[formattedDate]?.lunch || null} />
                <MealItem meal={'dinner'} date={formattedDate} meals={meals?.[formattedDate]?.dinner || null} />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
