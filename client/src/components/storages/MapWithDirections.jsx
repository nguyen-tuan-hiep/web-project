import React, { useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';

const MapWithDirections = ({ latitude, longitude }) => {
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiaGllcG50MiIsImEiOiJjbGpmNjFkbDUweGZmM2dzY2k2MWMzYmR2In0.NOF_FyU01LeUl5aWXh5GhA';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 15,
    });

    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      }),
      'top-left'
    );

    const marker1 = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => {
      map.remove();
    };
  }, [latitude, longitude]);

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default MapWithDirections;
