import React from 'react';

const PlaceImg = ({ place, index = 0, className }) => {
  if (!className) {
    className = 'object-cover';
  }
  return <img src={place.photos.length > 0 ? place.photos[index] : "../../empty.png"} alt="" className={`h-60 w-92 ${className}`} />;
};

export default PlaceImg;
