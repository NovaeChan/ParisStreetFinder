/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { environment } from '../Environments/EnvDev';
import '../style/components/__Map.css';
import Tooltip from './Tooltip';
import { createRoot } from 'react-dom/client';
import { MapContext } from './MapContext';

mapboxgl.accessToken = environment.mapbox.accessToken;

const Map = () => {
    const mapContainerRef = useRef(null);
    const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  
    const [lng, setLng] = useState(2.3483);
    const [lat, setLat] = useState(48.8577);
    const [zoom, setZoom] = useState(12.66);
    const [map, setMap] = useState(null); // State to store map instance

// Initialize map when component mounts
  useEffect(() => {
    const initializedMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/novae/cltypukrj006k01pfatxogdfx',
      center: [lng, lat],
      zoom: zoom
    });

    setMap(initializedMap); // Store map instance in state

    // change cursor to pointer when user hovers over a clickable feature
    initializedMap.on('mouseenter', e => {
      if (e.features.length) {
        initializedMap.getCanvas().style.cursor = 'pointer';
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    initializedMap.on('mouseleave', () => {
      initializedMap.getCanvas().style.cursor = '';
    });

    initializedMap.on('move', () => {
        setLng(initializedMap.getCenter().lng.toFixed(4));
        setLat(initializedMap.getCenter().lat.toFixed(4));
        setZoom(initializedMap.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => initializedMap.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MapContext.Provider value={map}>
        <div className='map-container' ref={mapContainerRef} />
    </MapContext.Provider>
  );
};



export default Map;