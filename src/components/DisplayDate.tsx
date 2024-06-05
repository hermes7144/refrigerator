import { useMemo } from 'react';
import { formatDate, getDate } from '../ts/util';

export default function DisplayDate({ date }: { date: string }) {
  const displayDate = useMemo(() => {
    const formattedDate = formatDate(date);
    const today = getDate();
    const tomorrow = getDate(1);

    if (formattedDate === today) return '오늘';
    if (formattedDate === tomorrow) return '내일';

    return new Date(date).toLocaleDateString('ko', { day: 'numeric', month: 'short' });
  }, [date]);

  const dateCompare = date ? formatDate(date) < getDate() : false;

  return <span className={`${dateCompare ? 'text-brand' : ''}`}>{displayDate}</span>;
}
