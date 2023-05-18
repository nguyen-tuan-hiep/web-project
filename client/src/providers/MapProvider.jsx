import React, { useState } from "react";

export const MapContext = React.createContext({});

export const MapProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const contextValue = {address, setAddress };
  return (
    <MapContext.Provider value={contextValue}>
      {children}
    </MapContext.Provider>
  );
}