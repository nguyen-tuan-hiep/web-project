import React, { useState  } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

export const MapContext = React.createContext({});

const MapWidget = (id) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [address, setAddress] = useState("");
  if (id) {console.log(id)}
  const handleMapClick = async (event) => {

    const lat = event.lat;
    const lng = event.lng;
    setLat(lat);
    setLng(lng);
    // Use lat and lng to get address
    // ...
    const response = await axios.get('/reverse-geocode', {params: {lat: lat, lng: lng}});
    if (response.status === 200) {
      setAddress(response.data.address);
    }
    else setAddress('Can not find address')
  };

  return (
    <div style={{position: 'relative', height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8' }}
        defaultCenter={{ lat: 59.95, lng: 30.33 }}
        defaultZoom={11}
        onClick={handleMapClick}
      ></GoogleMapReact>
      <div>
        Latitude: {lat}, Longitude: {lng}
      </div>
      <div>Address: {address}</div>
    </div>
  );
};

export default MapWidget;