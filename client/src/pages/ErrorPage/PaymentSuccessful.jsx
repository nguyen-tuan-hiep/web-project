import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../utils/index.js';
import emailjs from '@emailjs/browser';
import { differenceInCalendarDays } from 'date-fns';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

function PaymentSuccessful() {
  const [bookings, setBookings] = useState([]);
  const [canSendMail, setCanSendMail] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const navigate = useNavigate();
  const token = getItemFromLocalStorage('token');

  const handleClick = () => {
    navigate('/');
  };

  useEffect(() => {
    if (!canSendMail) {
      const getBookings = async () => {
        try {
          const { data } = await axios.get('/bookings', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Create an array of all unique user IDs from the bookings
          const userIds = Array.from(
            new Set(data.map((booking) => booking.user))
          );
          // Fetch the user data for each unique user ID
          const { data: users } = await axios.get(
            `/user?id=${userIds.join(',')}`
          );
          // Replace the 'user' field with the corresponding user object
          const populatedData = data.map((booking) => ({
            ...booking,
            user: users.find((user) => user._id === booking.user),
          }));
          setBookings(populatedData);
        } catch (error) {
          toast.error('Failed to fetch bookings');
        }
      };

      getBookings().then(() => {
        setCanSendMail(true);
      });
    } else {
      if (bookings.length > 0 && !mailSent) {
        setMailSent(true);
        const sendEmail = () => {
          emailjs
            .send(
              'service_2f72jif',
              'template_ygd8z4b',
              {
                to_name: bookings[0].name,
                to_email: bookings[0].user.email,
                place: bookings[bookings.length - 1].place.title,
                price: bookings[bookings.length - 1].price,
                booking_id: bookings[bookings.length - 1]._id,
                total_nights: differenceInCalendarDays(
                  new Date(bookings[bookings.length - 1].checkOut),
                  new Date(bookings[bookings.length - 1].checkIn)
                ),
                address: bookings[bookings.length - 1].place.address,
              },
              'A1Me166m6TwcmksZP'
            )
            .then((response) => {
              console.log('SUCCESS!', response.status, response.text);
            })
            .catch((error) => {
              console.error('FAILED...', error);
            });
        };
        sendEmail();
      }
    }
  }, [bookings]);

  return (
    <>
      <div className="flex justify-center items-center h-full my-12">
        <div className="w-1/2 text-center shadow-3xl rounded-2xl p-8" style={{minWidth:"700px"}}>
          <div className="">
            <CheckCircleRoundedIcon
              style={{ color: '#FF5A5F', fontSize: '64' }}
            />
            <p className="font-semibold text-4xl pt-4">Payment Successful</p>
            <p className="font-semibold text-2xl mt-4">
              Your transaction has been successfully processed.
            </p>
            {bookings && bookings[bookings.length - 1] && (
              <div className="text-xl pt-3">
                <p className="font-semibold text-3xl">Total payment</p>
                <p className="text-5xl font-semibold mt-3">
                  ${bookings[bookings.length - 1].price}
                </p>
                <p className="font-semibold pt-4">
                  Booking ID: {bookings[bookings.length - 1]._id}
                </p>
                <p className="pt-6 text-justify">
                  Remember, your booking ID is unique to your reservation, and
                  it acts as proof of your payment and booking confirmation.
                  Having it readily available will save you time and ensure a
                  seamless experience in case you need to make any changes or
                  inquiries in the future.
                </p>
                <p className="py-3 text-justify">
                  In the event that you misplace or forget your booking ID,
                  don't worry! Our customer support team is here to assist you.
                </p>
              </div>
            )}
            <button
              className="primary hover:bg-secondary transition my-4 hover:scale-105 transform"
              onClick={handleClick}
              style={{ width: '200px' }}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccessful;
