import React, { useState, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import { MapContext } from '../providers/MapProvider.jsx';

const MapWidget = (id) => {
  const {lat, setLat} = useContext(MapContext);
  const {lng, setLng} = useContext(MapContext);
  const {address, setAddress} = useContext(MapContext);
  // if (id) {console.log(id)}
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
    <div style={{marginTop: '5%',position: 'relative', height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8' }}
        defaultCenter={{ lat: 21.09, lng: 105.80 }}
        defaultZoom={9}
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