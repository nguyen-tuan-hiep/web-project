import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountNav from '../../components/AccountNav.jsx';
import axios from 'axios';
import BookingDates from '../../components/BookingDates.jsx';
import Spinner from '../../components/Spinner.jsx';
import PlaceImg from '../../components/PlaceImg.jsx';
import PaymentIcon from '@mui/icons-material/Payment';
import AI from '../../components/AI.jsx';
import { getItemFromLocalStorage } from '../../utils/index.js';
import { toast } from 'react-toastify';

const BookedPlacesPage = () => {
  const navigate = useNavigate();
  const token = getItemFromLocalStorage('token');
  const handleStartPlanning = () => {
    navigate('/'); // Call navigate when button is clicked
  };
  // const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getBookings = async () => {
      const { data } = await axios.get('/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.error) {
        toast.error(data.error.message);
      }
      await setBookings(data);
      setLoading(false);
    };

    getBookings().then(() => {});
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />

      {bookings.length > 0 ? (
        <>
          <h1 className='text-3xl font-semibold mb-5 mx-8'>
            Want to find a place that suits you best? Let's chat to find out!
          </h1>
          <AI />
          <h1 className='text-3xl font-semibold my-5 mx-8'>Your bookings</h1>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className='flex flex-row mx-8 bg-gray-100 my-5 rounded-2xl cursor-pointer hover:bg-gray-300 hover:scale-105 transition transform duration-200 ease-out place-card'
            >
              <Link
                to={`/account/bookings/${booking._id}`}
                className='flex gap-4 rounded-2xl overflow-hidden'
              >
                <div className='w-72'>
                  <PlaceImg place={booking.place} />
                </div>
                <div className='py-3 pr-3 grow'>
                  <h2 className='text-xl'>{booking.place.title}</h2>
                  <div className='text-xl'>
                    <div className='flex gap-2 '></div>
                    <div className='text-xl'>
                      <BookingDates
                        booking={booking}
                        className='items-center mb-2 mt-4  text-gray-600'
                      />

                      <div className='flex gap-1 items-center'>
                        <PaymentIcon />
                        <span className='text-2xl'>
                          Total price: ₹{booking.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <div className='flex flex-col'>
          <h1 className='text-3xl font-semibold mb-5 mx-8'>
            No bookings yet... <br /> Still don't know where to go? Let's chat
            to find out!
          </h1>
          <AI />
          <div className='mx-8'>
            <p className='text-3xl font-semibold my-5'>
              Time to dust off your bag!
            </p>
            <button
              className='font-semibold border border-black px-4 py-2 rounded-lg bg-transparent hover:bg-slate-100 hover:transition-all'
              onClick={handleStartPlanning}
            >
              Start planning
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedPlacesPage;