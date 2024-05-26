import removeAccents from 'remove-accents'
import datas from '../api/formateddata.json';
import {updateSideBar, updatePercentage, updateMap} from './updateDocument';

const streetFound = [];
let lastFoundGuesses = [];

export function processingGuess(guess, map){
    if(!guess) return 0;
    const normalizedGuess = removeAccents(guess.toLowerCase());
    if(!isStreetExist(normalizedGuess)){
        console.error(`La rue ${normalizedGuess} n'existe pas`);
        return 0;
    }
    if(isAlreadyGuess(normalizedGuess, streetFound)){
        console.error(`La rue ${normalizedGuess} a déjà été trouvée`);
        return 2;
    }
    addToStreetFound(normalizedGuess, datas);
    updatePercentage(streetFound, datas);
    updateSideBar(lastFoundGuesses);
    updateMap(lastFoundGuesses, map);
    localStorage.setItem("ParisStreetFinder", JSON.stringify(streetFound));
    lastFoundGuesses = [];
    return 1;
}

export function isStreetExist(guess){
    for (const street of datas){
        if(removeAccents(street.l_longmin.toLowerCase()) == guess || removeAccents(street.l_voie.toLowerCase()) == guess) return true
    }
    return false;
}

export function addToStreetFoundFromLocal(streets){
    streets.forEach(street => {
        streetFound.push(street);
    })
    return streetFound;
}

export function addToStreetFound(guess, datas){
    for(const street of datas){
        if(removeAccents(street.l_longmin.toLowerCase()) == guess || removeAccents(street.l_voie.toLowerCase()) == guess){
            streetFound.push({
                id: street.n_sq_vo,
                l_longmin: street.l_longmin,
                data: {
                "type": "Feature",
                "geometry": street.geom.geometry
                }
            })
            lastFoundGuesses.push({
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
