import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import { getItemFromLocalStorage } from '../utils';
import Spinner from '../components/Spinner';
import PlaceCard from '../components/PlaceCard';
import AddIcon from '@mui/icons-material/Add';

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
        console.log(error);
      }
    };
    getPlaces();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      {/* flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:scale-105 transition transform duration-200 ease-out */}
      <div className="text-center hover:scale-110 transition transform duration-200 ease-out">
        <Link
          className="inline-flex gap-1 bg-primary mb-5 text-white py-2 px-6 rounded-full"
          to={'/account/places/new'}
        >
          <AddIcon />
          Add new place
        </Link>
      </div>
      <div className="mt-4 ">
        {places.length > 0 &&
          places.map((place) => <PlaceCard place={place} key={place._id} />)}
      </div>
    </div>
  );
};

export default PlacesPage;
