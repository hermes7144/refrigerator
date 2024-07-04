import React from 'react';
import dayjs from 'dayjs';

interface DisplayDateProps {
  date: string;
}

export const DisplayDate: React.FC<DisplayDateProps> = ({ date }) => {
  const formattedDate = dayjs(date).format('M월 D일');
  const isDatePast = dayjs(date).isBefore(dayjs(), 'day');
  const className = isDatePast ? 'text-red-400' : '';

  return <span className={className}>{formattedDate}</span>;
};
