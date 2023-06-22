import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  ThingsToKnow,
  BookingDates,
  PlaceGallery,
  AddressLink,
} from '../../components/AllComponents.jsx';
import PaymentIcon from '@mui/icons-material/Payment';
import { getItemFromLocalStorage } from '../../utils/index.js';
import ReactStars from 'react-rating-stars-component';
import { toast } from 'react-toastify';

export default function BookedCancelPage() {
  const token = getItemFromLocalStorage('token');
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [rating, setRating] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get('./bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        });
    }
  }, [id]);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  console.log(rating);

  const handleCancelReservation = () => {
    if (booking) {
      axios
        .delete(`./bookings/${booking._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          console.log('Reservation canceled');
          navigate('/account/bookings');
        })
        .catch((error) => {
          console.error('Error canceling reservation:', error);
        });
    }
  };

  if (!booking) {
    return '';
  }
  const today = new Date();
  const checkInDate = new Date(booking.checkIn);
  const timeDiff = checkInDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
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
            <h2 className="text-xl mb-2 darktxt">Your booking information: </h2>
            <BookingDates
              booking={booking}
              className="items-center mb-2 mt-4  text-gray-600"
            />
            <PaymentIcon />
            <span className="text-xl">Total price: ${booking.price}</span>
          </div>
          <button
            className="bg-primary p-4 text-white rounded-2xl mr-10 cursor-pointer hover:bg-primary hover:opacity-90 hover:scale-105 transition transform duration-200 ease-out"
            style={{ height: '50%', display: daysDiff > 2 ? 'block' : 'none' }}
            onClick={handleCancelReservation}
          >
            Cancel reservation
          </button>
        </div>
      </div>
      <div className="relative z-30">
        <PlaceGallery place={booking.place} />
      </div>
      <div className="border-t mt-10">
        <div className="mt-8 px-20">
          <h2 className="text-2xl font-semibold mb-2">Create a review</h2>
          <div className="pl-4">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
          </div>
          <Review booking={booking} rating={rating} token={token} />
        </div>
      </div>
      <div className="border-t mt-10">
        <ThingsToKnow />
      </div>
    </div>
  );
}

function Review({ booking, rating, token }) {
  const navigate = useNavigate();
  const [review, setReview] = useState('');

  const handleSubmitReview = () => {
    const reviewData = {
      placeId: booking.place._id,
      bookingId: booking._id,
      rating,
      review,
    };

    axios
      .post(`./bookings/${booking._id}/review`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log('Review submitted');
        navigate(`/place/${booking.place._id}`);
      })
      .catch((error) => {
        if (error.response) {
          const { status } = error.response;
          if (status === 409) {
            toast.error('You have already reviewed  this booking.');
          } else if (status === 400) {
            toast.error('Cannot review before check-out.');
          } else {
            toast.error('Error submitting review. Please try again later.');
          }
        } else {
          toast.error('Error submitting review. Please try again later.');
        }
      });
  };

  return (
    <>
      <div className="mb-4">
        <textarea
          placeholder="Write your review here..."
          id="review"
          className="border-rounded w-full p-4"
          rows="4"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </div>
      <button
        className="bg-primary p-4 text-white rounded-2xl cursor-pointer hover:bg-primary hover:opacity-90 hover:scale-105 transition transform duration-200 ease-out"
        onClick={handleSubmitReview}
      >
        Submit Review
      </button>
    </>
  );
}
