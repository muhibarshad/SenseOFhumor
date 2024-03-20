import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbars(props) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setOpen(false);
  };

  return (
    <div>
      <Snackbar open={props.open}
      anchorOrigin={{ vertical:'top', horizontal:'right' }}
       autoHideDuration={6000} 
       onClose={handleClose}
       key={'top' + 'right'}
       >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Such user does not found, Sign up Please !
        </Alert>
      </Snackbar>
    </div>
  );
}