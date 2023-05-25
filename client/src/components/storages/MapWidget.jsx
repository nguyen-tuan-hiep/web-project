import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import { MapContext } from '../../providers/AllProviders.jsx';

const MapWidget = () => {
  const { setAddress, setLatitude, setLongitude } = useContext(MapContext);
  const handleMapClick = async (event) => {
    const lat = event.lat;
    const lng = event.lng;
    // Update the context state variables with the new latitude and longitude values
    setLatitude(lat);
    setLongitude(lng);
    const response = await axios.get('/reverse-geocode', {
      params: { lat: event.lat, lng: event.lng },
    });
    if (response.status === 200) {
      setAddress(response.data.address);
    } else setAddress('Can not find address');
  };

  return (
    <div
      style={{
        marginTop: '5%',
        position: 'relative',
        height: '50vh',
        width: '100%',
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8' }}
        defaultCenter={{ lat: 21.09, lng: 105.8 }}
        defaultZoom={10}
        onClick={handleMapClick}
      ></GoogleMapReact>
    </div>
  );
};

export default MapWidget;
