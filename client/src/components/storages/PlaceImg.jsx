import React from 'react';

const PlaceImg = ({ place, index = 0, className }) => {
  if (!className) {
    className = 'object-cover';
  }
  return (
    <img
      src={place.photos.length > 0 ? place.photos[index] : '../../empty.png'}
      alt=""
      className={`aspect-[3/2] ${className} rounded-xl w-full h-full`}
    />
  );
};

export default PlaceImg;
