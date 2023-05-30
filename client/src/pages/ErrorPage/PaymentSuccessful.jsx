import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../utils/index.js';
import emailjs from '@emailjs/browser';
import { differenceInCalendarDays } from 'date-fns';

function PaymentSuccessful() {
  const [bookings, setBookings] = useState([]);
  const [canSendMail, setCanSendMail] = useState(false);
  const [mailSended, setMailSended] = useState(false);
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

        getBookings().then(() => {setCanSendMail(true);});

      }
      else {
        if (bookings.length > 0 && !mailSended) {
          setMailSended(true);
          // setEmailSent(true);
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
          console.log('sent email');
        }
      }
    // }
  }, [bookings]);

  // useEffect(() => {
  //
  //
  // }, [bookings]);

  return (
    <>
      <section className="flex justify-center items-center pt-12 px-20 gap-30">
        <div className="w-full">
          <p className="font-semibold text-4xl">Payment Successful</p>
          <p className="font-semibold text-2xl mt-6">
            Transaction was accepted. Thank you for your payment.
          </p>
          <div className="font-semibold text-2xl mt-10 w-40">
            <button
              className="primary hover:bg-secondary transition my-4"
              onClick={handleClick}
            >
              Home
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default PaymentSuccessful;
