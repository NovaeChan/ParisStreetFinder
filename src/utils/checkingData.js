import removeAccents from 'remove-accents'
import datas from '../api/denominations-emprises-voies-actuelles.json';
import {updateFoundStreetSideBar, updatePercentage, updateMap} from './updateDocument';

const streetFound = [];
const streetLayer = [];

export function processGuess(guess, map){
    const lowerGuess = removeAccents(guess.toLowerCase());
    if(!isStreetExist(lowerGuess)){
        return "La rue n'existe pas";
    }
    if(isAlreadyGuess(lowerGuess, streetFound)){
        return "La rue a déjà été trouvée"
    }
    addToStreetFound(lowerGuess, datas);
    updatePercentage(streetFound, datas);
    updateFoundStreetSideBar(streetFound);
    updateMap(streetLayer, map);
}

export function isStreetExist(guess){
    for (const street of datas){
      if(street.typo.toLowerCase() == guess || removeAccents(street.nomvoie.toLowerCase()) == guess) return true
    }
    return false;
}

export function addToStreetFound(guess, datas){
    for(const street of datas){
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

export function isAlreadyGuess(guess, streetFound) {
    if(streetFound.length === 0) return false;

    for (const street of streetFound){
      if(removeAccents(street.typo_min.toLowerCase()).includes(guess)){
        return true;
      }
    }
    return false;
}
