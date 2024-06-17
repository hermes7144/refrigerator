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

export function getWeekDates(): Date[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 일요일=0, 월요일=1, ... 토요일=6
  const startDate = new Date(today);

  // 현재 날짜를 기준으로 이번 주의 시작일(월요일) 계산
  const dayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 일요일인 경우 -6, 다른 경우 1 - dayOfWeek
  startDate.setDate(today.getDate() + dayOffset);

  // 일주일치의 날짜와 요일 이름 계산
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });

  return weekDates;
}
