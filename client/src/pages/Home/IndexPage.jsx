import React, { useContext, useEffect } from 'react';
import { PlaceContext } from '../../providers/AllProviders.jsx';
import { Link } from 'react-router-dom';
import { Image, Spinner } from '../../components/AllComponents.jsx';
import { motion } from 'framer-motion';
import { containerVariants } from '../../components/Constant/Constants.jsx';
import StarRateIcon from '@mui/icons-material/StarRate';

const IndexPage = () => {
  const { places, loading, getPlaces } = useContext(PlaceContext);

  useEffect(() => {
    getPlaces();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <motion.div
      className='mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/place/${place._id}`} key={place._id}>
            <motion.div
              className='items-center cursor-pointer hover:scale-105 transition transform duration-200 ease-out sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              <Image
                src={
                  place.photos.length > 0 ? place.photos?.[0] : './empty.png'
                }
              />
            </motion.div>
            <div>
              <div className='flex items-center'>
                <p className='font-bold inline-block'>{place.title}</p>
                <p className='ml-auto'>
                  {place.averageRating}
                  <StarRateIcon style={{ paddingBottom: '5px' }} />
                </p>
              </div>
              <p className='text-sm text-gray-500 '>{place.address}</p>
            </div>
            <div>
              <span className='font-semibold'>${place.price} </span>
              per night
            </div>
          </Link>
        ))}
    </motion.div>
  );
};

export default IndexPage;
