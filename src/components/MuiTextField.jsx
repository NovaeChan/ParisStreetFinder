import { MapContext } from './MapContext';
import { useContext } from 'react';
import { TextField } from "@mui/material";
import { useState } from "react";
import { processingGuess } from "../utils/checkingData";

export default function MuiTextField(){
    const [isError, setIsError] = useState(false);
    const [helperText, setHelperText] = useState("");
    const [color, setColor] = useState("");
    const map = useContext(MapContext);

    function getResponseCode(responseCode){
        if(responseCode === 0){
            setIsError(true);
            setHelperText("La rue n'existe pas");
        }
        if(responseCode === 1){
            setIsError(false);
            setColor("success")
            setHelperText("Bien joué !");
        }
        if(responseCode === 2){
            setIsError(true);
            setHelperText("La rue a déjà été trouvée")
        }
    }

    return (
        <TextField label='Nom de la rue'
        variant="outlined"
        onKeyDown={(e) => {
            if(e.key === "Enter" && e.target.value.length > 0){
                const responseCode = processingGuess(e.target.value, map);
                getResponseCode(responseCode);
            }
        }}
        InputLabelProps={{
            style: { color: '#fff' }
        }}
        InputProps={{
            style: { color: '#fff' }
        }}
        error = {isError}
        helperText = {helperText}
        color = {color}
        fullWidth
        FormHelperTextProps={{
            style: { color: isError ? 'red' : 'green' }
        }}
        />
    )
}