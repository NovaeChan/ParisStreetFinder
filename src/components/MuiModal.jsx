import { Modal } from '@mui/material';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiButton from './MuiButton';

import '../style/components/__Modal.css'

export default function MuiModal({openState, handleClose}){
    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        height: 250,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openState}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}>
            <Fade in={openState}>
            <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Paramètres
                </Typography>
                <MuiButton />
            </Box>
            </Fade>
        </Modal>
    )
}