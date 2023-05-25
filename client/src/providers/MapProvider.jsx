import React, { useState } from 'react';

export const MapContext = React.createContext({});

export const MapProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const contextValue = {
    address,
    setAddress,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
  };
  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};
