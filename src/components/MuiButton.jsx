import { Button } from "@mui/material"
import '../style/components/__MuiButton.css'
import { useState } from "react"
import MuiAlert from './MuiAlert'

export default function MuiButton(){
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')

    const handleOpen = (e) => {
        const target = e.target.id;
        if(target === "restart"){
            setMessage("Fonctionnalitée pas encore implémentée. (Recommencer)")
            console.log(message)
        }
        if(target === "import"){
            setMessage("Fonctionnalitée pas encore implémentée. (Importer)")
        }
        if(target === "export"){
            setMessage("Fonctionnalitée pas encore implémentée. (Export)")
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
  
    return(
        <>
            <MuiAlert openState={open} handleClose={handleClose} message={message}/>
            <div className="buttonMenu-wrapper">
                <Button size="large" variant="contained" onClick={handleOpen} id="restart">Recommencer la partie</Button>
                <Button size="large" variant="contained" onClick={handleOpen} id="import">Importer une partie</Button>
                <Button size="large" variant="contained" onClick={handleOpen} id="export">Exporter une partie</Button>
            </div>
        </>
    )
}