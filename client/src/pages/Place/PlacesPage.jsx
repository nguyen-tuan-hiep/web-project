import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  AccountNav,
  PlaceCard,
  Spinner,
} from '../../components/AllComponents.jsx';
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
    getPlaces().then(() => {});
    console.log('Pl');
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary hover:bg-secondary transition mb-5 text-white py-2 px-6 rounded-full hover:scale-110 "
          to={'/account/places/new'}
        >
          <Add />
          Add new place
        </Link>
      </div>

      <div className="flex flex-wrap gap-9 w-full">
        {places.length > 0 &&
          places.map((place) => (
            <div className="" key={place._id}>
              <PlaceCard place={place} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
