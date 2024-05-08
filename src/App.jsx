import { useRef, useEffect, useState } from 'react';
import { MapContext } from './components/MapContext';
import mapboxgl from 'mapbox-gl';
import { environment } from './Environments/EnvDev';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import SettingsIcon from '@mui/icons-material/SettingsOutlined'
import MuiTextField from './components/MuiTextField';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

mapboxgl.accessToken = environment.mapbox.accessToken;

export default function App() {
  //Mapbox
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(2.3483);
  const [lat, setLat] = useState(48.8577);
  const [zoom, setZoom] = useState(12.66);

  //Button State
  const [open, setOpen] = useState(false);
  
  const buttonColor = grey[50];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
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

      setMap(newMap); // Mettez à jour l'état de la carte
    }
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
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}>
              <Fade in={open}>
                <Box sx={style}>
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
                </Box>
              </Fade>
          </Modal>
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
            <ul className='sideBar-streetFound'>

            </ul>
          </div>
        </div>
      </div>
    </MapContext.Provider>
  );
}
