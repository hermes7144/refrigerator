import { getWeekDates } from '../api/firebase';

export default function Home() {
  const res = getWeekDates();
  console.log(res);

  return <>dd</>;
}
