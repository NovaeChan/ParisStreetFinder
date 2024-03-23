import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import fetchData from './api/apiCall'
import { environment } from './Environments/EnvDev';
mapboxgl.accessToken = environment.mapbox.accessToken;

export default function App() {
  const streetFound = [];

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.3483);
  const [lat, setLat] = useState(48.8577);
  const [zoom, setZoom] = useState(12.66);

  const toFind = fetchData();
  const numbersOfStreet = toFind.length;
  console.log(toFind);
  console.log(numbersOfStreet);

  useEffect(() => {
    if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/novae/cltypukrj006k01pfatxogdfx/draft',
        center: [lng, lat],
        zoom: zoom
      }
    );

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  //Check si l'entrée est dans la liste de l'API
  //Si l'entrée ok alors on l'ajoute à un tableau + ajout dans la liste de la sideBar
  //Ajout sur la carte à l'aide des données de géolocalisations 

  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='input-wrapper'>
          <input type='text' placeholder='Nom de la rue'></input>
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
      <div className='sideBar'>
        <div className='sideBar-percentage'>
          <span>0.0</span>
          <span>% </span>
          <span>des rues trouvées</span>
        </div>
        <div className='sideBar-percentageBar'></div>
        <hr />
        <div className='sideBar-history'></div>
      </div>
    </div>
  );
}
