import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  AccountNav,
  MapWidget,
  Perks,
  PhotosUploader,
  Spinner,
} from '../../components/AllComponents.jsx';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MapContext } from '../../providers/AllProviders.jsx';
import { getItemFromLocalStorage } from '../../utils/index.js';
import Weather from '../../components/weather/Weather.jsx';
import { motion } from 'framer-motion';
import { containerVariants } from '../../components/Constant/Constants.jsx';

const PlacesFormPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState(0);
  const [checkOut, setCheckOut] = useState(24);
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(1500);
  const [loading, setLoading] = useState(false);
  const {
    address,
    setAddress,
    latitude,
    longitude,
    setLatitude,
    setLongitude,
  } = useContext(MapContext);

  useEffect(() => {
    if (!id) {
      setAddress('');
      setLatitude(null);
      setLongitude(null);
      return;
    }
    setLoading(true);
    axios.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      setTitle(place.title);
      setAddress(place.address);
      setAddedPhotos(place.photos);
      setDesc(place.description);
      setPerks(place.perks);
      setExtraInfo(place.extraInfo);
      setCheckIn(place.checkIn);
      setCheckOut(place.checkOut);
      setMaxGuests(place.maxGuests);
      setPrice(place.price);
      setLatitude(place.latitude);
      setLongitude(place.longitude);
      setLoading(false);
    });
  }, [id]);

  const preInput = (header, description) => {
    return (
      <>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  };

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const savePlace = async (e) => {
    const token = getItemFromLocalStorage('token');
    e.preventDefault();
    if (isEmptyOrSpaces(title)) {
      toast.error('Title is required');
      return;
    }
    if (isEmptyOrSpaces(address)) {
      toast.error('Address is required');
      return;
    }

    let placeData = {
      title,
      address,
      addedPhotos,
      desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
      latitude,
      longitude,
    };
    if (id) {
      placeData = { id, ...placeData };
      // update existing place
      const { data } = await axios.put(
        '/places/update-place',
        { placeData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
    } else {
      // new place
      const { data } = await axios.post(
        '/places/add-places',
        { placeData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
    }
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <AccountNav />
      <form onSubmit={savePlace} className="mx-8">
        {preInput(
          'Title',
          'Title for your place. Should be short and catchy as in advertisement'
        )}
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title, for example: My lovely apt"
        />
        <h2 className="text-2xl mt-4">Forecasted Weather</h2>
        <Weather latitude={latitude} longitude={longitude} />
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-2">
          <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-1">
            {preInput('Address', 'Address to this place')}
            <input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="address"
            />
            {preInput('Photos', 'more = better')}

            <PhotosUploader
              addedPhotos={addedPhotos}
              setAddedPhotos={setAddedPhotos}
            />
          </div>
          <MapWidget />
        </div>

        {preInput('Description', 'description of the place')}
        <textarea
          placeholder='For example: "This is a lovely apartment in the heart of the city. It has a great view and is close to all the shops and restaurants."'
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        {preInput('Perks', ' select all the perks of your place')}
        <Perks selected={perks} onChange={setPerks} />

        {preInput('Extra info', 'house rules, etc ')}
        <textarea
          placeholder='For example: "no smoking, no pets"'
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {preInput(
          'Check in & Check out times',
          'add check in and out times, remember to have some time window for cleaning the room between guests. '
        )}
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              id="checkIn"
              type="number"
              value={checkIn}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0 && value <= 24) {
                  setCheckIn(value);
                } else {
                  toast.error(
                    'Invalid check-in time. Please enter a value between 0 and 23.'
                  );
                }
              }}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              id="checkOut"
              type="number"
              value={checkOut}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0 && value <= 24) {
                  setCheckOut(value);
                } else {
                  toast.error(
                    'Invalid check-out time. Please enter a value between 0 and 23.'
                  );
                }
              }}
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              id="maxGuests"
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(Number(e.target.value))}
              placeholder="1"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="1"
            />
          </div>
        </div>
        <button className="primary hover:bg-secondary transition my-4">
          Save
        </button>
      </form>
    </motion.div>
  );
};

export default PlacesFormPage;
