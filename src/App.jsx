import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import removeAccents from 'remove-accents'
import fetchData from './api/apiCall'
import { environment } from './Environments/EnvDev';
mapboxgl.accessToken = environment.mapbox.accessToken;

export default function App() {
  const streetFound = [];
  const streetLayer = [];
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.3483);
  const [lat, setLat] = useState(48.8577);
  const [zoom, setZoom] = useState(12.66);

  const toFind = fetchData();
  const numbersOfStreet = toFind.length;

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

    const streetInput = document.querySelector('.streetInput');
    streetInput.addEventListener("keypress", (e) => {
      if(e.key === 'Enter'){
        if(e.target.value.length > 0){
          const guessedStreet = removeAccents(e.target.value.toLowerCase());
          if(!isStreetExist(guessedStreet)){
            console.log(false);
            //Animation input
          } else {
            if(!isAlreadyGuess(guessedStreet)){
              getStreetName(guessedStreet, toFind);
              updatePercentage();
              updateFoundStreetSideBar();
              updateMap()
              //Animation input
            }
            else {
              console.log("Déjà trouvée")
              //Animation input déjà trouvée
            }
          }  
        }
      }
    })
  });

  function isStreetExist(guess){
    for (const street of toFind){
      if(street.typo.toLowerCase() == guess || removeAccents(street.nomvoie.toLowerCase()) == guess) return true
    }
    return false;
  }

  function isAlreadyGuess(guess) {
    if(streetFound.length === 0) return false;

    for (const street of streetFound){
      if(removeAccents(street.typo_min.toLowerCase()).includes(guess)){
        return true;
      }
    }
    return false;
  }

  //Add guess to array of street
  function getStreetName(guess, toFind){
    for(const street of toFind){
      if(street.typo.toLowerCase() == guess || removeAccents(street.nomvoie.toLowerCase()) == guess){
        streetFound.push({
          id: street.id,
          typo_min: street.typo_min,
          data: {
            "type": "FeatureCollection",
            "features": [
              street.geo_shape
            ]
          }
        })
        streetLayer.push({
          id: street.id,
          typo_min: street.typo_min,
          data: {
            "type": "Feature",
            "geometry": street.geo_shape.geometry
          }
          })
      }
    }
  }

  function updateFoundStreetSideBar(){
    const ul = document.querySelector('.sideBar-streetFound');
    const lis = ul.querySelectorAll('li');

    for(let i = lis.length; i < streetFound.length; i++ ){
      const li = document.createElement("li");
      li.textContent = streetFound[i].typo_min;
      ul.append(li);
    }

  }

  function updatePercentage(){
    const percentNumber = document.querySelector('.percentNumber');
    const percentBar = document.querySelector('.sideBar-percentageBar');
    const percentage = Math.round(((streetFound.length / numbersOfStreet ) * 100)*1000)/1000;
    //Update bar
    percentBar.style.setProperty("--progress", percentage+"%");
    percentBar.style.transition = "width 2s ease 2s";
    //Update number
    percentNumber.innerHTML = percentage;
  }

  function updateMap(){
    for (const street of streetLayer){
      console.log(street);
      map.current.addLayer({
          'id': street.id+"fill",
          'type': 'fill',
          'source': {
            type: "geojson",
            data: street.data
          },
          'layout': {},
          'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
          }
      });
      map.current.addLayer({
        'id': street.id+"outline",
        'type': 'line',
        'source': {
          type: "geojson",
          data: street.data
        },
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 1
        }
    });
    }
    streetLayer.length = 0;
  }
  //Ajout sur la carte à l'aide des données de géolocalisations 

  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='input-wrapper'>
          <input type='text' className='streetInput' placeholder='Nom de la rue'></input>
        </div>
        <div ref={mapContainer} className="map-container" />
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
  );
}
