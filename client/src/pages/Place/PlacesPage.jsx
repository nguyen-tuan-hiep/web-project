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
import { motion } from 'framer-motion';
import { containerVariants } from '../../components/Constant/Constants.jsx';

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
  }, []);

  // if (loading) {
  //   return <Spinner />;
  // }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // exit="exit"
    >
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

      <div className="grid gap-y-8 mx-24 my-12">
        <div>
          <img src="../../../airbnb_host.png" alt="host" />
        </div>

        <div className="grid grid-cols-3 gap-16">
          <div>
            <p className="font-bold mb-2 text-lg">
              One-to-one guidance from a Superhost
            </p>
            <p className="text-gray-500">
              We'll match you with a Superhost in your area, who'll guide you
              from your first question to your first guest—by phone, video call,
              or chat.
            </p>
          </div>

          <div>
            <p className="font-bold mb-2 text-lg">
              An experienced guest for your first booking
            </p>
            <p className="text-gray-500">
              For your first booking, you can choose to welcome an experienced
              guest who has at least three stays and a good track record on
              Airbnb.
            </p>
          </div>

          <div>
            <p className="font-bold mb-2 text-lg">
              Specialized support from Airbnb
            </p>
            <p className="text-gray-500">
              New Hosts get one-tap access to specially trained Community
              Support agents who can help with everything from account issues to
              billing support.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlacesPage;
