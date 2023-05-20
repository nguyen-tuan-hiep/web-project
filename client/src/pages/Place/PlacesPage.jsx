import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AccountNav, PlaceCard, Spinner } from '../../components/AllComponents.jsx';
import { getItemFromLocalStorage } from '../../utils/index.js';
import { Add } from '@mui/icons-material';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getItemFromLocalStorage('token');
    const getPlaces = async () => {
      try {
        const { data } = await axios.get('places/user-places', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlaces(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getPlaces().then(() => {
    });
  }, [places]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      {/* flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:scale-105 transition transform duration-200 ease-out */}
      <div className='text-center hover:scale-110 transition transform duration-200 ease-out'>
        <Link
          className='inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full'
          to={'/account/places/new'}
        >
          <Add />
          Add new place
        </Link>
      </div>

      <div className='mt-4 flex flex-wrap'>
        {places.length > 0 &&
          places.map((place) => (
            <div className='sm:w-1/2 md:w-1/3 lg:w-1/4' key={place._id}>
              <PlaceCard place={place} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
