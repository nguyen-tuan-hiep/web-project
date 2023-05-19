import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddressLink from '../components/AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import BookingDates from '../components/BookingDates';
import PaymentIcon from '@mui/icons-material/Payment';
import ThingsToKnow from '../components/ThingsToKnow';
import { getItemFromLocalStorage } from '../utils/index.js';

export default function BookedCancelPage() {
  const token = getItemFromLocalStorage('token');
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios.get('./bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  const handleCancelReservation = () => {
    if (booking) {
      axios
        .delete(`./bookings/${booking._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          // Reservation canceled successfully
          // You can perform additional actions here if needed
          console.log('Reservation canceled');
          navigate('/account/bookings');
        })
        .catch((error) => {
          // Handle error
          console.error('Error canceling reservation:', error);
        });
    }
  };

  if (!booking) {
    return '';
  }

  return (
    <div className="mt-4 -mx-8 pt-8">
      <div className="px-20">
        <h1 className="text-3xl font-semibold">{booking.place.title}</h1>
        <AddressLink placeAddress={booking.place.address} />
      </div>
      <div className="bg-gray-200 p-4 mb-6 mx-20 rounded-2xl">
        <div
          className="flex"
          style={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            <h2 className="text-xl mb-2">Your booking infomation: </h2>
            <BookingDates
              booking={booking}
              className="items-center mb-2 mt-4  text-gray-600"
            />
            <PaymentIcon />
            <span className="text-xl">Total price: ₹{booking.price}</span>
          </div>
          <button
            className="bg-primary p-4 text-white rounded-2xl  mr-10 cursor-pointer hover:bg-primary hover:opacity-90 hover:scale-105 transition transform duration-200 ease-out"
            style={{ height: '50%' }}
            onClick={handleCancelReservation}
          >
            Cancel reservation
          </button>
        </div>
      </div>
      <div className="relative z-30">
        <PlaceGallery place={booking.place} />
      </div>
      <div className='border-t mt-10'>
        <ThingsToKnow/>
      </div>
    </div>
  );
}
