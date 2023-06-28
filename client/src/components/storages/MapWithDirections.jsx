import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

const MapWithDirections = ({ latitude, longitude }) => {
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiaGllcG50MiIsImEiOiJjbGpmNjFkbDUweGZmM2dzY2k2MWMzYmR2In0.NOF_FyU01LeUl5aWXh5GhA';

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    });

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 13,
    });

    map.addControl(directions, 'top-left');
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
