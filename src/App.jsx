import { useRef, useEffect, useState } from 'react';
import { MapContext } from './components/MapContext';
import mapboxgl from 'mapbox-gl';
import { environment } from './Environments/EnvDev';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import SettingsIcon from '@mui/icons-material/SettingsOutlined'
import MuiTextField from './components/MuiTextField';
import MuiModal from './components/MuiModal';
import { processGuess } from './utils/checkingData';

mapboxgl.accessToken = environment.mapbox.accessToken;

export default function App() {
  //Mapbox
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(2.3483);
  const [lat, setLat] = useState(48.8577);
  const [zoom, setZoom] = useState(12.66);

  const [open, setOpen] = useState(false);
  
  const buttonColor = grey[50];

  useEffect(() => {
    const loadLocalStorageData = () => {
      return new Promise((resolve, reject) => {
        const savedStreet = localStorage.getItem("ParisStreetFinder");
        if (savedStreet) {
          const formatedStreet = JSON.parse(savedStreet);
          console.log(formatedStreet);
          resolve(formatedStreet);
        } else {
          reject("Aucune donnée trouvée dans localStorage");
        }
      });
    };

    const initializeMap = (formatedStreet) => {
      if (map) return; // initialize map only once
      if (mapContainer.current) {
        const newMap = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/novae/cltypukrj006k01pfatxogdfx/draft',
          center: [lng, lat],
          zoom: zoom
        });
        newMap.on('move', () => {
          setLng(newMap.getCenter().lng.toFixed(4));
          setLat(newMap.getCenter().lat.toFixed(4));
          setZoom(newMap.getZoom().toFixed(2));
        });
        
        newMap.on('load', () => {
          formatedStreet.forEach(street => {
            console.log(street.typo_min);
            processGuess(street.typo_min, newMap);
          })
        });
        setMap(newMap); // Mettez à jour l'état de la carte
      }};
      loadLocalStorageData().then(initializeMap).catch(error => console.error("Erreur lors du chargement des données locale", error))
  }, [map, lng, lat, zoom]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <MapContext.Provider value={map}>
      <div className='container'>
        <div className='wrapper'>
          <div className='input-wrapper'>
            <MuiTextField />
            {/* <input type='text' className='streetInput' placeholder='Nom de la rue'></input> */}
          </div>
          <div className='button-wrapper'>
            <IconButton variant="outlined" color={buttonColor} onClick={handleOpen}>
              <SettingsIcon style={{ color: grey[900] }}/>
            </IconButton>
          </div>
          <div ref={mapContainer} className="map-container" />
          <MuiModal openState={open} handleClose={handleClose}/>
        </div>
        <div className='sideBar'>
          <div className='sideBar-percentage'>
            <span className='percentNumber'>0.0</span>
            <span>% </span>
            <span>des rues trouvées</span>
          </div>
          <div className='sideBar-percentageWrapper'>
            <div className='sideBar-percentageBar'></div>
          </div>
          <hr />
          <div className='sideBar-history'>
            <ul className='sideBar-streetFound'></ul>
          </div>
        </div>
      </div>
    </MapContext.Provider>
  );
}