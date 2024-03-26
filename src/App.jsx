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
          const guessedStreet = e.target.value.toLowerCase();
          if(!isStreetExist(guessedStreet)){
            console.log(false);
            //Animation input
          } else {
            if(!isAlreadyGuess(guessedStreet)){
              getStreetName(guessedStreet, toFind);
              updatePercentage();
              console.log(streetFound);
              updateFoundStreetSideBar();
              //Animation input + ajouter dans la liste des rues trouvées 
              //Ajouter à la map la rue 
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
    let found = false;
    toFind.forEach(street => {
      if(street.typo.toLowerCase().includes(guess)){
        found = true;
        return true
      }
    })
    return found;
  }


  function isAlreadyGuess(guess) {
    if(streetFound.length === 0) return false;
    return streetFound.filter(str => str.toLowerCase().includes(guess.toLowerCase())).length > 0;
  }

  //Add guess to array of street
  function getStreetName(guess, toFind){
    const subArr = toFind.filter(street => street.typo_min.toLowerCase().includes(guess.toLowerCase()));
    subArr.forEach(obj => streetFound.push(obj.typo_min));
  }

  function updateFoundStreetSideBar(){
    const ul = document.querySelector('.sideBar-streetFound');
    const lis = ul.querySelectorAll('li');

    for(let i = lis.length; i < streetFound.length; i++ ){
      const li = document.createElement("li");
      li.textContent = streetFound[i];
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

  function updateFoundStreetMap(){
    //Update de la map à l'aide du guess de la personne après vérif
  }


  //Check si l'entrée est dans la liste de l'API
  //Si l'entrée ok alors on l'ajoute à un tableau + ajout dans la liste de la sideBar
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
