import { useRef, useEffect, useState } from 'react';
import { MapContext } from './components/MapContext';
import mapboxgl from 'mapbox-gl';
import { environment } from './Environments/EnvDev';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import SettingsIcon from '@mui/icons-material/SettingsOutlined'
import MuiTextField from './components/MuiTextField';
import MuiModal from './components/MuiModal';
import datas from './api/formateddata.json';
import { updatePercentage, updateSideBar } from './utils/updateDocument';
import { addToStreetFoundFromLocal } from './utils/checkingData';

mapboxgl.accessToken = environment.mapbox.accessToken;
const localStreets = JSON.parse(localStorage.getItem("ParisStreetFinder"));
console.log(localStreets)

export default function App() {
  //Mapbox
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.36);
  const [lat, setLat] = useState(48.85);
  const [zoom, setZoom] = useState(12);

  const [open, setOpen] = useState(false);
  
  const buttonColor = grey[50];

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/novae/cltypukrj006k01pfatxogdfx/draft',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('load', () => {
      if(localStreets){
        updateWithLocalStorage(localStreets, map);
        addToStreetFoundFromLocal(localStreets);
        updatePercentage(localStreets, datas);
        updateSideBar(localStreets);
      }
    })
  });

  function updateWithLocalStorage(streets, map){
    streets.forEach(street => {
      map.current.addSource("id"+street.id,{
        "type": "geojson",
        "data": street.data
      });
      map.current.addLayer({
        'id': street.id+"line",
        'type': 'line',
        'source': "id"+street.id,
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#0080ff',
          'line-width': 6
        }
      })
    })
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
      <MapContext.Provider value={map}>
        <div className='container'>
          <div className='wrapper'>
            
              <div className='input-wrapper'>
                <MuiTextField />
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