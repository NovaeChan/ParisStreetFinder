import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import '../style/components/__MuiAlert.css'

export default function MuiAlert({openState, handleClose, message}){

    return(
        <Box sx={{ width: '100%' }} className="alert-box">
            <Collapse in={openState}>
                <Alert
                severity='warning'
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={handleClose}>
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                {message}
                </Alert>
            </Collapse>
        </Box>
    )
}