import { MapContext } from './MapContext';
import { useContext } from 'react';
import { TextField } from "@mui/material";
import { useState } from "react";
import { processGuess } from "../utils/checkingData";

export default function MuiTextField(){
    const [isValid, setisValid] = useState();
    const map = useContext(MapContext);

    return (
        <TextField label='Nom de rue' 
        variant="outlined"
        onKeyDown={(e) => {
            if(e.key === "Enter" && e.target.value.length > 0){
                setisValid(processGuess(e.target.value, map))
            }
        }}
        InputLabelProps={{
            style: { color: '#fff' }
        }}
        InputProps={{
            style: { color: '#fff' }
        }}
        error = {!!isValid}
        helperText = {isValid}
        fullWidth
        />
    )
}