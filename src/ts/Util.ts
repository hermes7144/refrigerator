import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export function getDate(offset = 0) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + offset);

  // Adjust to KST (UTC+9)
  const utc = targetDate.getTime() + targetDate.getTimezoneOffset() * 60000;
  const kstTime = new Date(utc + 9 * 3600000);

  return formatDate(kstTime);
}

export function addDays(date, days) {
  const clone = new Date(date);
  clone.setDate(date.getDate() + days);
  return clone;
}

function getWeekRangeRelativeTo(weekOffset) {
  const date = new Date();
  const dayOfWeek = date.getDay() || 7;
  const weekStart = new Date(date);
  const daysToAdd = weekOffset * 7 - dayOfWeek + 1;
  weekStart.setDate(date.getDate() + daysToAdd);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  return {
    start: formatDate(weekStart),
    end: formatDate(weekEnd),
  };
}

export function getThisWeek() {
  return getWeekRangeRelativeTo(0); // Get the current week
}

export function getNextWeek() {
  return getWeekRangeRelativeTo(1); // Get the next week
}

export function formatDate(date) {
  return new Date(date).toISOString().substring(0, 10);
}

export function getDeadline(category, includeStart = false) {
  switch (category) {
    case '오늘':
      return getDate();
    case '내일':
      return getDate(1);
    case '이번 주':
      return getThisWeek().end;
    case '다음 주': {
      const nextWeek = getNextWeek();
      return includeStart ? nextWeek : nextWeek.end;
    }

    default:
      return null;
  }
}

export function getWeekDates(): Dayjs[] {
  const today = dayjs();
  const startOfWeek = today.startOf('week').add(1, 'day'); // 이번 주의 시작일(월요일)

  // 일주일치의 날짜 계산
  const weekDates = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

  return weekDates;
}
