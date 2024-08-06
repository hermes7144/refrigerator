import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);
dayjs.locale('ko');

export function formatDate(date?: Dayjs | Date | string | null) {
  return dayjs(date).format('YYYY-MM-DD');
}

export const isValidDate = (date: Date | null): boolean => {
  return date !== null && dayjs(date).isValid();
};

export function getWeekDates(): Dayjs[] {
  const startOfWeek = dayjs().startOf('isoWeek'); // 월요일부터 시작
  const weekDates = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
  return weekDates;
}
