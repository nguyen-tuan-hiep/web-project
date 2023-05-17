import React, { useState } from "react";

export const MapContext = React.createContext({});

export const MapProvider = ({ children }) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [address, setAddress] = useState("");
  const contextValue = { lat, setLat, lng, setLng, address, setAddress };
  return (
    <MapContext.Provider value={contextValue}>
      {children}
    </MapContext.Provider>
  );
}