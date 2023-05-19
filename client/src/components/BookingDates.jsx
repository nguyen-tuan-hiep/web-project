import React from 'react';
import { differenceInCalendarDays, format } from 'date-fns';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EastIcon from '@mui/icons-material/East';

const BookingDates = ({ booking, className }) => {
  return (
    <div className={'flex gap-1 ' + className}>
      <NightlightRoundIcon />
      {`${differenceInCalendarDays(
        new Date(booking.checkOut),
        new Date(booking.checkIn),
      )} nights`}
      <div className='flex gap-1 items-center ml-2'>
        <CalendarMonthIcon />
        {format(new Date(booking.checkIn), 'dd-MM-yyyy')}
      </div>
      <EastIcon />
      <div className='flex gap-1 items-'>
        <CalendarMonthIcon />
        {format(new Date(booking.checkOut), 'dd-MM-yyyy')}
      </div>
    </div>
  );
};

export default BookingDates;
