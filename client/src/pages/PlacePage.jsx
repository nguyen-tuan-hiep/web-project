import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from '../components/AddressLink';
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import Spinner from '../components/Spinner';
import { thingsToKnow } from '../components/constants';

const PlacePage = () => {
  const thingsToKnowContent = (
    <div className="grid grid-cols-3 ">
      {thingsToKnow.map((item) => (
        <div key={item.title}>
          <h4 className="font-semibold text-lg pb-2">{item.title}</h4>
          {item.content.map((itemContent) => (
            <div
              key={itemContent.name}
              className="flex items-center gap-2 pb-3"
            >
              {itemContent?.icon}
              <p>{itemContent.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return '';
    }

    setLoading(true);

    const getPlace = async () => {
      const { data } = await axios.get(`/places/${id}`);
      setPlace(data.place);
      setLoading(false);
    };
    getPlace();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!place) {
    return;
  }

  return (
    // <div className="w-full">
    <div className="mt-4 -mx-8 pt-8">
      <div className="px-20">
        <h1 className="text-3xl font-semibold">{place.title}</h1>

        <AddressLink placeAddress={place.address} />
      </div>
      <div className="relative z-30">
        <PlaceGallery place={place} />
      </div>

      <div className="mt-8 mb-8 gap-0 grid grid-cols-1 md:grid-cols-[6fr_5fr]">
        <div className="pl-20">
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn} <br /> Check-out: {place.checkOut} <br />
          Max number of guests: {place.maxGuests}
          <div>
            <h2 className="font-semibold text-2xl mt-4">Extra Info</h2>
          </div>
          <div className="text-sm text-gray-700 leading-5 mb-4 mt-2">
            {place.extraInfo}
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white px-8 py-8 border-t things">
        <div className="py-5 w-full border-b px-20">
          <h3 className="text-2xl pb-3 font-semibold">Things to know</h3>
          {thingsToKnowContent}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default PlacePage;
