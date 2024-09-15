import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);
dayjs.locale('ko');

export const isValidDate = (date: Date | null): boolean => {
  return date !== null && dayjs(date).isValid();
};

export function getWeekDates(weekShift: number): string[] {
  const startOfWeek = dayjs().add(weekShift, 'week').startOf('isoWeek'); // 월요일부터 시작
  const weekDates = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day').format('YYYYMMDD'));
  return weekDates;
}
