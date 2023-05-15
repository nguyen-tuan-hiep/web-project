import React, { useContext } from 'react';
import { PlaceContext } from '../providers/PlaceProvider';
import { Link } from 'react-router-dom';
import Image from '../components/Image';
import Spinner from '../components/Spinner';

const IndexPage = () => {
  const { places, loading } = useContext(PlaceContext);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/place/${place._id}`} key={place._id}>
            <div className="flex items-center m-2 mt-0 mb-0 space-x-4cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
              {place.photos?.[0] && <Image src={place.photos?.[0]} />}
            </div>
            <div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500 ">{place.title}</h3>
            </div>
            <div className="mt-1">
              <span className="font-semibold">₹{place.price} </span>
              per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
