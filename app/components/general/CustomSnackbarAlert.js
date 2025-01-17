import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import AppContext from '@/context/AppContext';


export default function SuccessSnackbarAlert({message}) {

  const {openSuccessAlert:open, setOpenSuccessAlert: setOpen} = React.useContext(AppContext)


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar 
      open={open} 
      autoHideDuration={8000} 
      onClose={handleClose}
      message={message}
      action={action}
      // anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    
  );
}