import React, { useContext, useEffect } from 'react';
import { PlaceContext } from '../../providers/AllProviders.jsx';
import { Link } from 'react-router-dom';
import { Spinner, Image } from '../../components/AllComponents.jsx';

const IndexPage = () => {
  const { places, loading, getPlaces } = useContext(PlaceContext);

  useEffect(() => {
    getPlaces();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/place/${place._id}`} key={place._id}>
            <div className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
              <Image
                src={
                  place.photos.length > 0 ? place.photos?.[0] : './empty.png'
                }
              />
            </div>
            <div>
              <h2 className="font-bold">{place.title}</h2>
              <h3 className="text-sm text-gray-500 ">{place.address}</h3>
            </div>
            <div>
              <span className="font-semibold">${place.price} </span>
              per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
