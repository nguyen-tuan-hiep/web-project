import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';
import AccountNav from '../components/AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import MapWidget from '../components/MapWidget.jsx';
import { MapContext } from '../providers/MapProvider.jsx';
import { getItemFromLocalStorage } from '../utils/index.js';

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
  const {address, setAddress} = useContext(MapContext);

  useEffect(() => {
    if (!id) {
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
      setLoading(false);
    });
  }, [id]);

  const preInput = (header, description) => {
    return (
      <>
        <h2 className='text-2xl mt-4'>{header}</h2>
        <p className='text-gray-500 text-sm'>{description}</p>
      </>
    );
  };

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const savePlace = async (e) => {
    const token = getItemFromLocalStorage('token');
    console.log('Get token from local: ', token);
    console.log("ưefwe");
    e.preventDefault();
    if (isEmptyOrSpaces(title)) {
      toast.error('Title is required');
      return;
    }
    if (isEmptyOrSpaces(address)) {
      toast.error('Address is required');
      return;
    }

    const placeData = {
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
    };
    console.log(placeData);
    if (id) {
      // update existing place
      const { data } = await axios.put('/places/update-place',
        {id, ...placeData},
        {headers: {
          Authorization: `Bearer ${token}`,
        },});
      toast.success(data.message);
    } else {
      // new place
      const { data } = await axios.post('/places/add-places',
        { placeData },
        {headers: {
            Authorization: `Bearer ${token}`,
          },});
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
    <div>
      <AccountNav />
      <form onSubmit={savePlace} className='mx-8'>
        {preInput(
          'Title',
          'Title for your place. Should be short and catchy as in advertisement',
        )}
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='title, for example: My lovely apt'
        />

        <div className='grid gap-10 sm:grid-cols-2 md:grid-cols-2'>
          <div className='grid gap-2 sm:grid-cols-3 md:grid-cols-1'>
            {preInput('Address', 'Address to this place')}
            <input
              id='address'
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
          id='desc'
          value={desc} onChange={(e) => setDesc(e.target.value)} />

        {preInput('Perks', ' select all the perks of your place')}
        <Perks selected={perks} onChange={setPerks} />

        {preInput('Extra info', 'house rules, etc ')}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {preInput(
          'Check in & Check out times',
          'add check in and out times, remember to have some time window for cleaning the room between guests. ',
        )}
        <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-4'>
          <div>
            <h3 className='mt-2 -mb-1'>Check in time</h3>
            <input
              id='checkIn'
              type='number'
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder='14'
            />
          </div>
          <div>
            <h3 className='mt-2 -mb-1'>Check out time</h3>
            <input
              id='checkOut'
              type='number'
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder='11'
            />
          </div>
          <div>
            <h3 className='mt-2 -mb-1'>Max number of guests</h3>
            <input
              id='maxGuests'
              type='number'
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              placeholder='1'
            />
          </div>
          <div>
            <h3 className='mt-2 -mb-1'>Price per night</h3>
            <input
              id='price'
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='1'
            />
          </div>
        </div>
        <button className='primary hover:bg-red-700 transition my-4'>Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
