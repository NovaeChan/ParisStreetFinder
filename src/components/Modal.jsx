import { Box, Typography } from "@mui/material";

import '../style/components/__Modal.css'

export default function Modal(){
    return (
        <Box>
            <Typography id="modal-modal-title" varient="h5" component="h2">
                Paramètre
            </Typography>
            <Typography id="modal-modal-description">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</Typography>
        </Box>
    )
}