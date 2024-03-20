import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal(props) {
   const navigate =  useNavigate()
    const deleteHandler=async()=>{
        const id = localStorage.getItem('id');
       const response = await fetch(`http://localhost:3002/${id}`,{
            method:"DELETE"
        })
        if(response.ok){
            localStorage.clear();
            navigate('/login')
        }
    }
  return (
    <div>
      <Button onClick={props.handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure to Delete your account?
            </Typography>
            <Typography id="transition-modal-description" variant="subtitle2"sx={{ mt: 2 }}>
              This step will permanently Delete your account , with no backup .
            </Typography>
            <Grid container spacing={6} direction="row" alignItems="center" justifyContent="center" sx={{mt:0.1}}>
            <Grid item>
            <Button color='secondary' variant='outlined' onClick={()=>props.handleClose()}>No</Button>
            </Grid>
            <Grid item>
            <Button color='error' variant='contained' onClick={deleteHandler} >delete</Button>
            </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
