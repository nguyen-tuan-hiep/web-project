import React, { useContext, useEffect, useState } from 'react';
import { differenceInDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UserContext } from '../providers/UserProvider';

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInDays(new Date(checkOut), new Date(checkIn));
  }

  const handleBooking = async () => {
    const response = await axios.post('/bookings', {
      checkIn,
      checkOut,
      noOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });

    // const bookingId = response.data._id;

    setRedirect(`/account/bookings/${response.data.booking.user}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white p-4 rounded-2xl mr-20 shadow-3xl">
      <div className="text-xl text-center">Price: ₹{place.price} per night</div>
      <Stack spacing={2} mt={2} px={1}>
        <LocalizationProvider dateAdapter={AdapterDateFns} className="px-2">
          <DatePicker
            label="Check In"
            value={checkIn}
            onChange={(newValue) => {
              setCheckIn(newValue);
            }}
            textField={(params) => <TextField {...params} />}
            format="dd/MM/yyyy"
            minDate={new Date()}
          />
          <DatePicker
            label="Check out"
            value={checkOut}
            onChange={(newValue) => {
              setCheckOut(newValue);
            }}
            textField={(params) => <TextField {...params} />}
            format="dd/MM/yyyy"
            minDate={checkIn ? new Date(checkIn) : new Date()}
          />
        </LocalizationProvider>
        <div className="pt-3 pb-1 border-t">
          <TextField
            label="Number or guest"
            variant="outlined"
            type="number"
            style={{ width: '100%', padding: '0px' }}
            InputProps={{
              inputProps: {
                min: 0, // Set min value to 0 to prevent negative numbers
              },
            }}
          />
        </div>
        {numberOfNights > 0 && (
          <div>
            <div className="pt-4 pb-4 border-t">
              <TextField
                label="Your full name"
                variant="outlined"
                type="text"
                style={{ width: '100%', padding: '0px' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                label="Phone number"
                variant="outlined"
                type="tel"
                style={{ width: '100%', padding: '0px' }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        )}
      </Stack>
      <div className='my-4 mx-20'>
        <button
          onClick={handleBooking}
          className="primary hover:scale-110 transition transform duration-200 ease-out"
        >
          Book this place
          {numberOfNights > 0 && <span> ₹{numberOfNights * place.price}</span>}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
