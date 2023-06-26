import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <motion.div
        className='relative inset-0 text-black min-h-full '
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className='pt-10 pb-10 grid gap-4 backdrop-blur-lg'>
          <div className='mb-2'>
            <h2 className='text-3xl text-center font-semibold'>
              Photos of {place.title}
            </h2>
            <button
              className='fixed right-20 top-0 flex py-2 px-4 rounded-2xl bg-white text-black shadow-3xl hover:scale-105 transform transition-all duration-200'
              onClick={() => setShowAllPhotos(false)}
            >
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div className='mx-auto' key={index}>
                <img src={String(photo)} alt='' style={{ width: '85vh' }} />
              </div>
            ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className='px-20'>
      <div className='relative inline-block'>
        <div className='flex flex-row gap-4'>
          {place.photos?.[0] && (
            <div
              className={`w-full h-68${
                place.photos.length > 1 ? ' md:w-1/3' : ''
              }`}
            >
              <img
                src={place.photos[0]}
                alt=''
                className='w-full h-full object-cover'
              />
            </div>
          )}
          {place.photos?.[1] && (
            <div className={`w-full h-68 md:w-1/3`}>
              <img
                src={place.photos[1]}
                alt=''
                className='w-full h-full object-cover'
              />
            </div>
          )}
          {place.photos?.[2] && (
            <div className='w-full h-68 md:w-1/3'>
              <img
                src={place.photos[2]}
                alt=''
                className='w-full h-full object-cover'
              />
            </div>
          )}
        </div>
      </div>
      <br />

      <button
        className='rounded-md bg-gray-100 mt-4 py-2 px-4 text-lg font-medium text-gray-700 hover:bg-gray-200 focus:ring-gray-500 transition transform duration-200 ease-out all-photo-button'
        onClick={() => setShowAllPhotos(true)}
      >
        View All photos ({place?.photos?.length ?? 0})
      </button>
    </div>
  );
};

export default PlaceGallery;
