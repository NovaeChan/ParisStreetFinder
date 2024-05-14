import removeAccents from 'remove-accents'
import datas from '../api/formateddata.json';
import {updateFoundStreetSideBar, updatePercentage, updateMap} from './updateDocument';

const streetFound = [];
let index = 0;

export function processGuess(guess, map){
    const lowerGuess = removeAccents(guess.toLowerCase());
    console.log(lowerGuess);
    if(!isStreetExist(lowerGuess)){
        return "La rue n'existe pas";
    }
    if(isAlreadyGuess(lowerGuess, streetFound)){
        return "La rue a déjà été trouvée"
    }
    addToStreetFound(lowerGuess, datas);
    updatePercentage(streetFound, datas);
    updateFoundStreetSideBar(streetFound);
    index = updateMap(streetFound, map, index);
    //Save the game
    localStorage.setItem("ParisStreetFinder", JSON.stringify(streetFound))
}

export function isStreetExist(guess){
    for (const street of datas){
      if(street.l_longmin.toLowerCase() == guess || removeAccents(street.l_voie.toLowerCase()) == guess) return true
    }
    return false;
}

export function addToStreetFound(guess, datas){
    for(const street of datas){
        if(street.l_longmin.toLowerCase() == guess || removeAccents(street.l_voie.toLowerCase()) == guess){
            streetFound.push({
                id: street.n_sq_vo,
                l_longmin: street.l_longmin,
                data: {
                "type": "Feature",
                "geometry": street.geom.geometry
                }
            })
        }
    }
}

export function isAlreadyGuess(guess, streetFound) {
    if(streetFound.length === 0) return false;
    for (const street of streetFound){
      if(removeAccents(street.l_longmin.toLowerCase()).includes(guess)){
        return true;
      }
    }
    return false;
}
