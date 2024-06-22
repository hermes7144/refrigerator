import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export function formatDate(date?: Dayjs | string) {return dayjs(date).format('YYYY-MM-DD')}

export function getWeekDates(): Dayjs[] {
  const startOfWeek = dayjs().startOf('week').add(1, 'day');
  const weekDates = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
  return weekDates;
}
