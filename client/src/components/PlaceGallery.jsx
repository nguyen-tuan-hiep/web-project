import React, { useState } from 'react';
import Image from './Image';

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-full">
        <div className="p-8 bg-black grid gap-4">
          <div>
            <h2 className="text-3xl mr-36">Photos of {place.title}</h2>
            <button
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl bg-white text-black shadow shadow-gray-500"
              onClick={() => setShowAllPhotos(false)}
            >
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div className="mx-auto" key={index}>
                <img src={photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="relative inline-block">
        <div className="flex flex-row gap-4">
          {place.photos?.[0] && (
            <div>
              <img className="w-full" src={place.photos[0]} alt="" />
            </div>
          )}
          {place.photos?.[1] && (
            <div>
              <img className="w-full" src={place.photos[1]} alt="" />
            </div>
          )}
          {place.photos?.[2] && (
            <div>
              <img className="w-full" src={place.photos[2]} alt="" />
            </div>
          )}
        </div>
      </div>
      <br />

      <button
        className="rounded-md bg-gray-100 py-2 px-4 text-lg font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition transform duration-200 ease-out"
        onClick={() => setShowAllPhotos(true)}
      >
        View All photos ({place?.photos?.length ?? 0})
      </button>
    </div>
  );
};

export default PlaceGallery;
