import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  AddressLink,
  BookingWidget,
  PlaceGallery,
  Spinner,
  ThingsToKnow,
} from '../../components/AllComponents.jsx';
import Weather from '../../components/weather/Weather.jsx';
import { MapContext } from '../../providers/AllProviders.jsx';

const PlacePage = () => {
  const { latitude, longitude, setLatitude, setLongitude } =
    useContext(MapContext);
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (!id) {
      setLatitude(null);
      setLongitude(null);
      return;
    }

    setLoading(true);

    const getPlace = async () => {
      const { data } = await axios.get(`/places/${id}`);
      setPlace(data.place);
      setLoading(false);
      console.log('latitude', latitude);
      console.log('longitude', longitude);
    };
    getPlace().then(() => {});

    const getReviews = async () => {
      const { data } = await axios.get(`/places/${id}/reviews`);
      setReviews(data.reviews);

      if (data.reviews.length > 0) {
        const sum = data.reviews.reduce((total, review) => total + review.rating, 0);
        const average = sum / data.reviews.length;
        setAverageRating(average);
      } else {
        setAverageRating(0);
      }
    };

    Promise.all([getPlace(), getReviews()]).catch((error) => {
      console.error('Error:', error);
    });

  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!place) {
    return;
  }

  return (
    <>
      <div className="mt-4 -mx-8 pt-8">
        <div className="px-20">
          <h1 className="text-3xl font-semibold">{place.title}</h1>
          <AddressLink placeAddress={place.address} />
        </div>
        <div className="relative z-30">
          <PlaceGallery place={place} />
        </div>
        <div className="px-20 pt-10">
          <h1 className="text-3xl font-semibold">Forecasted weather</h1>
          <Weather latitude={place.latitude} longitude={place.longitude} />
        </div>
        <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[6fr_5fr]">
          <div className="pl-20">
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              <p>{place.description}</p>
            </div>
            <p>Check-in: {place.checkIn}</p>
            <p>Check-out: {place.checkOut}</p>
            <p>Max number of guests: {place.maxGuests}</p>
            <div>
              <h2 className="font-semibold text-2xl mt-4">Extra Info</h2>
            </div>
            <div className="text-sm leading-5 mb-4 mt-2">
              <p>{place.extraInfo}</p>
            </div>
            <div>
              <h2 className="font-semibold text-2xl mt-4">Perks</h2>
            </div>
            <div>
              <div className="text-sm leading-5 mb-4 mt-2">
                {place.perks.map((item) => (
                  <p className="mx-auto" key={String(item)}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>
        <div className="bg-white px-8 py-8 border-t things">
          <div>
              <h2 className="font-semibold text-2xl mt-4 px-10">Reviews</h2>
              <div className="text-sm leading-5 mb-4 mt-2 px-10">
                {reviews.length > 0 ? (
                  <>
                    {averageRating > 0 && (
                      <p >Average Rating: {averageRating.toFixed(1)} *** {reviews.length} reviews</p>
                    )}
                    <ul>
                      {reviews.map((review) => (
                        <li key={review._id}>
                          <p>Rating: {review.rating}</p>
                          <p>Review: {review.review}</p>
                          <p>By: {review.user.name}</p>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
          </div>
        </div>
        <div className="bg-white px-8 py-8 border-t things">
        <div>
            <ThingsToKnow />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacePage;